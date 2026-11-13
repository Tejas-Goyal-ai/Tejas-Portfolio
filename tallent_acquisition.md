# Autonomous Recruitment & Onboarding SaaS: Comprehensive Product Architecture & Agent Workflow Report

---

## 1. Executive Summary

The **OxiqAI Recruitment & Onboarding Platform** is an enterprise-grade, multi-tenant SaaS application designed to automate the entire talent acquisition lifecycle—from corporate job requisition through automated screening, live interviewing, comparative ranking, offer generation, and post-offer document verification.

The product replaces fragmented hiring workflows with an ecosystem of **7 purpose-built autonomous agents and connector services**. These agents operate asynchronously, communicating through durable PostgreSQL/Supabase work queues and event brokers, guaranteeing multi-tenant isolation, deterministic fairness, and zero-hallucination compliance.

---

## 2. High-Level System Architecture & Topology

```
 [Client Portal / Admin Console]
       │
       ▼
 [FastAPI Core Backend (Port 8000)]
       │
 ┌─────┴─────────────────────────────────────────────────────────────────────────────┐
 │                         SHARED DATABASE (Supabase PostgreSQL)                     │
 │  • Durable Work Queues  • Row-Level Security (RLS)  • Private File Storage Buckets│
 └─────┬─────────────────────────────────────────────────────────────────────────────┘
       │
       ├──▶ 1. Job Description Generator Agent (Worker)
       ├──▶ 2. Resume Screening Agent (Worker)
       ├──▶ 3. Interview Planner Agent (Worker)
       ├──▶ 4. Meeting Agent (Port 8080)
       ├──▶ 5. AI Interview Connector (Port 8090) ──▶ [AI Interview Agent (Port 8010)]
       ├──▶ 6. Evaluator Agent (Worker)
       └──▶ 7. Offer Pipeline & Offer Agent (Port 8081)
```

### Core Infrastructure Components

| Component | Service Path | Port | Primary Responsibility |
|---|---|---|---|
| **Client Portal & Landing Page** | `landing_page_and_client_portal/frontend/` | `5173` | Self-serve employer portal (plans, requisitions, pipeline, offer approvals) & public candidate application page. |
| **Admin Console** | `OxiqAI_Admin_Portal/` | `5174` | Internal operations portal for multi-client job syndication (LinkedIn, Indeed) and lifecycle monitoring. |
| **Core Backend API** | `landing_page_and_client_portal/backend/` | `8000` | Secure FastAPI gateway; sole custodian of the Supabase Service Role Key and payment processing. |
| **AI Interview Connector** | `AI interview connector/` | `8090` | Self-scheduling bridge to the real-time AI Interview Agent (`../InterviewAgent`). |
| **Meeting Scheduling Service** | `meeting_agent/` | `8080` | Human-led interview scheduling, Google Meet creation, and scorecard capture. |
| **Offer Console & Candidate Portal** | `Offer_Pipeline/` | `8081` | Interactive offer acceptance, document uploads, and verification portal. |

---

## 3. End-to-End Autonomous Pipeline Walkthrough

```
[1. Requisition Created] ──▶ [2. JD Agent (Claude + Grounding)] ──▶ [3. Job Syndicated Live]
                                                                            │
[6. Round Planner] ◀── [5. Wave Shortlisting] ◀── [4. Resume Screener (Batched + Rubric)]
        │
        ├───────────────────────────────┬───────────────────────────────┐
        ▼                               ▼                               ▼
 [Round A: AI Interview]     [Round B: Human Conductor]      [Round C: Final Round]
 (Self-Scheduling & Score)   (Google Meet & Scorecard)                  │
        │                               │                               │
        └───────────────────────┬───────┴───────────────────────────────┘
                                ▼
                    [7. Evaluator Agent (Cross-Round Ranking)]
                                │
                    [8. Client Selects Final Hire]
                                │
                    [9. Offer Agent (Drafts Offer & Packs)]
                                │
                    [10. Client Reviews & Inputs Salary]
                                │
                    [11. Candidate Accepts & Uploads Docs]
                                │
                    [12. Verification & Mark Hired]
```

---

## 4. Deep-Dive: The 7 Autonomous Agents & Their Workflows

---

### Agent 1: Job Description Generator Agent
* **Directory:** `Job description generator agent/`
* **Execution Mode:** Background daemon worker (`python -m agent --watch`)
* **Primary Models:** Claude Opus 5 (`claude-opus-5`) + Deterministic Python Composer

#### Purpose
Transforms raw, fragmented hiring manager requisition notes into compelling, structured, and candidate-ready job descriptions without inventing false hiring terms.

#### Step-by-Step Workflow
1. **Durable Trigger:** When a client completes the 5-step requisition wizard in the portal, a PostgreSQL trigger fires on the `requisitions` table, atomically inserting a task into `job_description_queue`.
2. **Settle Window De-duplication:** Employs an 8-second settle window (`008_queue_settle_window.sql`). Repeated autosaves from intermediate wizard steps reset the clock, ensuring the agent executes exactly once per finished requisition.
3. **Pass 1 — Deterministic Fact Assembly (`composer.py`):** Before calling any LLM, the agent programmatically compiles a factual draft from structured requisition fields (`title`, `department`, `responsibilities`, `skills`, `salary_min`, `salary_max`, `employment_type`). If a field is blank, it is omitted. This draft is 100% accurate *by construction*.
4. **Pass 2 — Claude Prose Polish (`writer.py`):** The deterministic draft is passed to Claude Opus with strict instructions: polish tone, vary rhythm, and convert fragments into engaging prose, but never add substance.
5. **Pass 3 — Asymmetric Grounding Check (`grounding.py`):** A custom verification engine tokenizes the rewritten draft and cross-checks every **Checkable Claim** against source data:
   * **Numbers & Dates:** Years of experience, headcounts, notice periods.
   * **Financials & Currency:** Salary bands, bonus percentages, currency symbols.
   * **Identifiers & Links:** Email addresses, URLs, tech version strings.
6. **Zero-Risk Fallback:** If a single unverified claim is detected, Claude's rewrite is discarded. The deterministic template draft is saved to the `"Job_description"` table, logging violations in `grounding_notes`.

---

### Agent 2: Resume Screening Agent
* **Directory:** `Resume screening agent/`
* **Execution Mode:** Background daemon worker (`python -m screening --watch`)
* **Primary Models:** Claude 3.5 Sonnet + Deterministic Scoring Engine

#### Purpose
Eliminates resume screening fatigue by evaluating candidates against objective role rubrics, enforcing mandatory requirement caps, and shortlisting candidates in capacity-aware waves.

#### Step-by-Step Workflow
1. **Dynamic Rubric Extraction:** Extracts the job rubric into explicit competencies, separating **Must-Haves** from **Nice-to-Haves**, and establishes evidence anchors.
2. **Batch Formation (`014_resume_screening.sql`):** Candidates are ingested into deterministic batches of 5. This amortizes prompt overhead and enables comparative consistency across CV evaluations.
3. **Structured Evidence Scoring (`scoring.py`):**
   * The model assesses each criterion strictly into evidence categories: `met` (1.0 credit), `partial` (0.5 credit), or `not_evidenced` (0.0 credit).
   * **Pure Arithmetic Scoring:**
     $$\text{Score} = 100 \times \frac{\sum (\text{weight} \times \text{credit})}{\sum \text{weight}} \quad (\text{must-haves weight} \times 2)$$
   * **Must-Have Cap Guardrail:** If an applicant misses evidence for even a single must-have, their score is hard-capped at **60** (`MUST_HAVE_CAP = 60`), preventing candidates with strong nice-to-haves from bypassing core requirements (passing bar is 70).
4. **Capacity-Based Wave Shortlisting (`shortlist.py` & `015_shortlist_waves.sql`):**
   * Computes shortlist targets dynamically based on openings ($N$) and interview capacity.
   * Requisitions are filled in progressive waves (e.g., top $3 \times N$ candidates). As candidates drop out or fail rounds, subsequent waves automatically unlock.

---

### Agent 3: Interview Planner Agent
* **Directory:** `Interview planner agent/`
* **Execution Mode:** Background daemon worker (`python -m planner --watch`)
* **Primary Models:** Rule-based deterministic state machine (Zero LLM)

#### Purpose
Sequences the candidate's journey across sequential interview rounds, enforcing prerequisite progression, conductor constraints, and round-by-round state transitions.

#### Step-by-Step Workflow
1. **Shortlist Ingestion:** Automatically triggered when the Resume Screening Agent marks a candidate as `shortlisted`.
2. **Round Plan Compilation (`candidate_round_plan` table):** Reads the requisition's predefined round configuration (e.g., Round 1: AI Screen $\rightarrow$ Round 2: Technical Human Panel $\rightarrow$ Round 3: Cultural Fit).
3. **Conductor Assignment & Sequencing:**
   * Designates each round's executor: `AI` (autonomous voice agent) vs. `Human` (internal hiring team).
   * Enforces strict sequential dependencies: Round $N+1$ remains locked until Round $N$ receives a passing evaluation from the Evaluator Agent.
4. **Queue Hand-off:** Hands the candidate off to either the **AI Interview Connector** or the **Meeting Agent**, depending on the conductor type.

---

### Agent 4: Meeting Scheduling Agent
* **Directory:** `meeting_agent/`
* **Execution Mode:** Multi-process service (Scheduler worker + Web server on Port `8080`)
* **Integrations:** Google Calendar / Google Meet API, SMTP Email Gateway

#### Purpose
Automates human-led interview scheduling, eliminating back-and-forth email coordination between interviewers and candidates while ensuring timely scorecard submission.

#### Step-by-Step Workflow
1. **Trigger:** Activated when the Interview Planner marks a human-conducted round as `ready_to_schedule`.
2. **Interviewer Availability Gathering:** Proposes available slots and emails the assigned conductor a private, tokenized scheduling interface.
3. **Automated Google Meet Generation:** Upon slot selection, the agent:
   * Generates a distinct Google Meet room link.
   * Emits automated calendar invites (`.ics`) to both the interviewer and candidate.
   * Enforces double-booking prevention guards in the database (`012_interviews_progress.sql`).
4. **Post-Interview Scorecard Collection:** Immediately after the scheduled slot concludes, the agent triggers an automated email sequence to the conductor containing a secure, 1-click evaluation form.
5. **Evaluation Commitment:** Submits the structured rubric ratings and qualitative notes to PostgreSQL, alerting the Evaluator Agent.

---

### Agent 5: AI Interview Connector
* **Directory:** `AI interview connector/`
* **Execution Mode:** Background worker + Web booking server on Port `8090`
* **Upstream Integration:** Live Voice Interview Agent (`../InterviewAgent` on Port `8010`)

#### Purpose
Orchestrates autonomous, real-time AI voice interviews, handling candidate self-scheduling, room provisioning, and scorecard ingestion.

#### Step-by-Step Workflow
1. **Self-Scheduling Invitation:** Emails shortlisted candidates a secure link to the **Pick-Your-Time Portal** (`017_ai_interview_slot_choice.sql`).
2. **Session Arming & Token Minting:**
   * When the candidate confirms a time window, the connector requests the AI Interview Agent Gateway to arm a room.
   * Issues an HMAC-signed, expiring single-use room token (`common/links.py`).
3. **Autonomous Voice Interview Execution:**
   * The candidate enters the live room (served over WebSockets).
   * Runs the 3-agent live stack: **Planner** (generates frozen blueprint), **Interviewer** (conducts real-time conversational laddering on GPT-Live), and **Scorer** (grades against competencies).
4. **Score Ingestion & Transcript Storage:**
   * Listens for the `evaluation.ready` event from the AI Interview Agent.
   * Persists the headline score (0–100), per-competency ratings, integrity flags, and full transcript into `ai_interviews` (`016_ai_interviews.sql`).
   * Marks the round complete, signaling the Evaluator Agent.

---

### Agent 6: Evaluator Agent
* **Directory:** `Evaluator agent/`
* **Execution Mode:** Background daemon worker (`python -m evaluator --watch`)
* **Primary Models:** Weighted ranking engine + Decision logic

#### Purpose
Aggregates heterogeneous evaluation data (AI interview metrics + human interviewer scorecards), performs cross-round normalization, and manages candidate stage progression.

#### Step-by-Step Workflow
1. **Evaluation Normalization:** Standardizes disparate scoring scales into a unified, weighted scoring model (`round_evaluations` table).
2. **Intermediate Round Automation:**
   * For non-final rounds, compares candidate performance against the role's qualification threshold.
   * Passing candidates automatically have their next round unlocked in the `candidate_round_plan`.
   * Underperforming candidates are moved to `rejected`, triggering automated polite notifications.
3. **Final Round Cross-Candidate Ranking:**
   * In the final round, aggregates scores across all evaluated dimensions (technical proficiency, communication, integrity score, must-have coverage).
   * Computes an ordinal ranking of all remaining finalists.
4. **Client Decision Presentation:** Surfaces the ranked leader-board directly in the Client Portal on **Hiring Progress $\rightarrow$ Rankings**, allowing the employer to inspect candidate CVs and confirm the final hiring selections with one click.

---

### Agent 7: Offer Pipeline & Offer Agent
* **Directory:** `Offer_Pipeline/`
* **Execution Mode:** Worker daemon + Candidate-facing portal on Port `8081`
* **Primary Models:** Claude 3.5 Sonnet / Haiku (Offer drafting) + ReportLab PDF Generator

#### Purpose
Automates the legal drafting, dispatch, candidate acceptance, and pre-boarding document verification of employment contracts.

#### Step-by-Step Workflow
1. **Autonomous Offer Drafting (`offer_drafts`):**
   * The moment a hiring manager selects a finalist in the portal, the Offer Agent reads the role requisition and job description.
   * Extracts contract terms: designation, department, reporting manager, location, probation period, notice period, and annual leave.
   * **Candidate Classification:** Classifies the hire as **Fresher** vs. **Experienced** (experienced hires automatically have salary slip and experience letter upload requirements appended to their pre-boarding checklist).
   * *Critical Guardrail:* The agent leaves annual compensation and equity blank for explicit employer specification.
2. **Employer Review & Financial Sign-off:** The employer inputs the agreed CTC/salary in the portal and clicks **Send Offer**.
3. **Cryptographic Document Generation:** The agent renders professional PDF legal packages:
   * Official Letter of Employment (incorporating company letterhead)
   * Company HR Handbook
   * Proprietary Information & Non-Disclosure Agreement (NDA)
4. **Candidate Acceptance Portal:** Dispatches a secure, tokenized invitation. The candidate reviews the offer package online, accepts the terms, and digitally signs the NDA.
5. **Document Verification Loop:**
   * Candidate uploads proof documents (Government ID, Educational Certificates, Relieving Letters, Recent Payslips) into the private `offer-documents` bucket.
   * The employer inspects uploaded documents in the portal via temporary, signed 5-minute URLs.
   * If any document is illegible or fraudulent, the client can reject it with a specific correction notice.
6. **Mark Hired:** Once all mandatory documents pass verification, the candidate's status advances to **Hired**, completing the onboarding lifecycle.

---

## 5. Security, Isolation & Multi-Tenancy Invariants

| Security Dimension | Implementation Mechanism |
|---|---|
| **Multi-Tenant Isolation** | All tables enforce PostgreSQL Row-Level Security (`client_id = current_client_id()`). Company ID is derived strictly from verified JWT tokens, never from browser request parameters. |
| **Cross-Company Leak Proofing** | Composite foreign keys `(requisition_id, client_id) REFERENCES requisitions(id, client_id)` make mismatched cross-company assignments syntactically unrepresentable at the DB engine level. |
| **Document Privacy** | Resumes and identity verification documents are stored in private Supabase Storage buckets. Public access is forbidden; documents are accessed via ephemeral, HMAC-signed URLs expiring in 5 minutes. |
| **Separation of Admin Surface** | Internal syndication endpoints (`OxiqAI_Admin_Portal`) require a dedicated `ADMIN_API_KEY` header, completely isolating operations personnel from client session cookies. |

---

## 6. Comprehensive Migration & Database Registry

The platform's unified schema spans migrations `001` through `024`, partitioned across owning service modules:

| Migration Range | Owning Module | Tables & Functions Created |
|---|---|---|
| **`001` – `005`** | `landing_page_and_client_portal` | `clients`, `client_profiles`, `plans`, `subscriptions`, `payments`, `requisitions`, `interview_rounds` |
| **`006` – `008`** | `Job description generator agent` | `"Job_description"`, `job_description_queue`, atomic claim RPCs, settle window triggers |
| **`009`** | `OxiqAI_Admin_Portal` | `job_postings`, syndication run states, LinkedIn takedown flags |
| **`010`** | `landing_page_and_client_portal` | `candidates` extended schema (15 structured application fields) |
| **`011`** | `Interview planner agent` | `candidate_round_plan` (round execution order, conductor mapping) |
| **`012` – `013`** | `meeting_agent` | `interviews`, `interviews.plan_id`, conductor double-booking constraints |
| **`014` – `015`** | `Resume screening agent` | `resume_screening_batches`, `resume_screening_results`, `requisitions.shortlist_target`, wave shortlisting RPCs |
| **`016` – `017`** | `AI interview connector` | `ai_interviews`, `ai_interview_slot_choice` (candidate self-scheduling) |
| **`018`** | `Evaluator agent` | `round_evaluations`, `evaluation_round_status` (rankings, stage advancement) |
| **`019` – `024`** | `Offer_Pipeline` | `offers`, `offer_drafts`, `offer_documents`, `offer_events`, private document bucket permissions |

---

## 7. Summary of Product Advantages for Interview Defense

1. **Grounded Autonomous Execution:** AI models are never allowed to author sensitive factual claims (salaries, requirements, legally binding offer terms) without deterministic programmatic validation.
2. **Asymmetric Verification Architecture:** The system employs two-stage Generation $\rightarrow$ Criticism patterns (e.g., Regex tokenizers in JD generation, pure arithmetic in resume scoring).
3. **Resilient Failure Modes:** Crashing workers release locked rows back to durable queues via `FOR UPDATE SKIP LOCKED`, preventing dropped tasks, infinite loops, and duplicate candidate scoring.
4. **Human-in-the-Loop Safeguards:** Low-confidence evaluations, missing must-haves, or protected-trait references automatically yield execution to human hiring managers rather than forcing hallucinated decisions.

