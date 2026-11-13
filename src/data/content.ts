export interface NavItem {
  id: string
  label: string
}

export interface QuickFact {
  label: string
  value: string
}

export interface SkillGroup {
  title: string
  blurb: string
  items: string[]
}

export interface ExperienceProject {
  name: string
  blurb: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  blurb: string
  projects: ExperienceProject[]
}

export interface Metric {
  value: string
  label: string
}

export interface FeaturedProject {
  id: string
  name: string
  subtitle: string
  category: string
  year: string
  tagline: string
  summary: string
  metrics: Metric[]
  overview: string
  pillars: { title: string; text: string }[]
  flow: string[]
  highlights: { title: string; text: string }[]
  tech: string[]
}

export interface ExtraProject {
  name: string
  blurb: string
  tech: string[]
  metric: string
}

export const profile = {
  name: 'Tejas Goyal',
  firstName: 'Tejas',
  lastName: 'Goyal',
  role: 'Generative AI Engineer',
  roles: [
    'Generative AI Engineer',
    'Multi-Agent Systems Architect',
    'Real-Time Voice AI Developer',
    'Backend & Automation Engineer',
  ],
  location: 'India',
  email: 'tejasgoyal003@gmail.com',
  phone: '+91 78076 06441',
  linkedin: 'https://www.linkedin.com/in/tejas-goyal-ai/',
  linkedinLabel: 'linkedin/tejas-goyal-ai',
  github: 'https://github.com/Tejas-Goyal-ai/',
  githubLabel: 'github/Tejas-Goyal-ai',
  photo: `${import.meta.env.BASE_URL}profile.jpg`,
  resumeUrl: `${import.meta.env.BASE_URL}Tejas_Goyal_Resume.pdf`,
  summary:
    'Generative AI Engineer specializing in multi-agent systems, AI-powered automation, and real-time voice applications. I build backend services with Python, FastAPI, Redis Streams, and WebSockets — powering LLM-driven recruitment workflows, RAG applications, and automated evaluation systems.',
  about: [
    "Hi, I'm Tejas Goyal, a Generative AI Engineer with hands-on industry experience in building AI-powered applications and intelligent automation solutions. I enjoy exploring new technologies and turning ideas into practical solutions.",
    'My work focuses on LLM-powered applications, multi-agent systems, RAG pipelines, and real-time voice AI. I primarily work with Python, FastAPI, LangChain, LangGraph, Redis, and modern AI technologies.',
    "I'm passionate about learning, solving challenging problems, and building useful AI products. I'm always looking forward to exploring new opportunities and contributing to innovative projects in Generative AI and Agentic AI.",
  ],
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'contact', label: 'Contact' },
]

export const quickFacts: QuickFact[] = [
  { label: 'Total experience', value: '1 yr 1 mo' },
  { label: 'Current location', value: 'Chandigarh' },
  { label: 'Expected CTC', value: '6 LPA' },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    blurb: 'The core language I build and ship every production AI system in.',
    items: ['Python'],
  },
  {
    title: 'Generative AI & LLMs',
    blurb: 'Models, agents, and retrieval pipelines that reason over your data with grounded answers.',
    items: [
      'Multi-Agent Systems',
      'Agentic Workflows',
      'RAG',
      'Prompt Engineering',
      'Vector Embeddings',
      'Anthropic Claude',
      'OpenAI GPT-4o & GPT-Live',
      'Cohere',
      'Ollama',
    ],
  },
  {
    title: 'Frameworks & Backend',
    blurb: 'The async Python stack powering APIs, orchestration, and long-running agent work.',
    items: ['FastAPI', 'LangChain', 'LangGraph', 'Hugging Face', 'AsyncIO', 'WebSockets'],
  },
  {
    title: 'Databases & Messaging',
    blurb: 'Persistence and durable streams that keep stateful agents consistent and replayable.',
    items: ['PostgreSQL', 'Supabase', 'Redis Streams', 'ChromaDB'],
  },
  {
    title: 'Real-Time Voice AI',
    blurb: 'Full-duplex audio transport for natural, low-latency spoken conversations.',
    items: ['LiveKit', 'WebRTC', 'HTML5 Media APIs', 'Full-Duplex Audio'],
  },
  {
    title: 'Frontend',
    blurb: 'Interfaces and dashboards that make complex AI systems easy to drive.',
    items: ['React', 'Streamlit', 'HTML5', 'CSS'],
  },
  {
    title: 'DevOps, Monitoring & Tools',
    blurb: 'Shipping, scaling, and observing the whole stack from prototype to production.',
    items: ['Docker', 'Docker Compose', 'Kubernetes', 'Uvicorn', 'Git / GitHub', 'n8n', 'REST APIs'],
  },
  {
    title: 'Auth & Payments',
    blurb: 'Secure access and monetization plumbing so products can onboard and charge users.',
    items: ['JWT', 'Google OAuth', 'HMAC Signatures', 'Razorpay'],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: 'OxiqAI Pvt. Ltd.',
    role: 'Generative AI Intern',
    period: 'Apr 2026 — Oct 2026',
    blurb:
      'Built enterprise agentic platforms — an autonomous recruitment SaaS and a real-time voice interview engine.',
    projects: [
      {
        name: 'AI Interview Agent — Real-Time Voice AI',
        blurb:
          'A real-time AI voice interviewer that conducts, proctors, and scores spoken technical interviews autonomously.',
      },
      {
        name: 'Talent Acquisition Automation Platform',
        blurb:
          'A recruitment SaaS where 7 autonomous agents run the full hiring lifecycle, from job posting to offer and document verification.',
      },
      {
        name: 'HRMS — Human Resource Management System',
        blurb:
          'A unified HR management system with 12 modules covering employees, payroll, attendance, and AI-assisted HR support.',
      },
    ],
  },
  {
    company: 'QuantumCrafter Studio Pvt. Ltd.',
    role: 'Generative AI Trainee',
    period: 'Sep 2025 — Feb 2026',
    blurb:
      'Engineered high-concurrency real-time backends and event-driven automation pipelines.',
    projects: [
      {
        name: 'SDLC Agent',
        blurb:
          'A high-concurrency real-time collaboration backend supporting 100+ rooms and 5,000+ simultaneous users.',
      },
      {
        name: 'RAG based PDF Chatbot',
        blurb:
          'A retrieval-augmented chatbot that answers questions from uploaded PDFs using vector search and LLMs.',
      },
      {
        name: 'AI Stock Market Signal Automation',
        blurb:
          'An event-driven pipeline that turns live market data into automated trading signals.',
      },
    ],
  },
]

export const education = [
  {
    school: 'Chandigarh Engineering College',
    detail: 'B.Tech, Electronics & Communication Engineering',
    period: '2021 — 2025',
  },
  {
    school: 'St Soldier Int. Convent School',
    detail: 'PCM',
    period: '2019 — 2021',
  },
]

export const certifications = [
  { name: 'Generative AI', issuer: 'IBM SkillsBuild', year: '2026' },
  { name: 'AI Engineer Certificate', issuer: 'OneRoadmap', year: '2026' },
]

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'interview-agent',
    name: 'OxiqAI Interview Agent',
    subtitle: 'Real-Time Autonomous Voice Interview Platform',
    category: 'Real-Time Voice AI · Multi-Agent',
    year: '2026',
    tagline: 'An adaptive voice interviewer that listens, probes, and scores — fairly.',
    summary:
      'A real-time AI voice interviewer that conducts, proctors, and scores spoken technical interviews autonomously.',
    metrics: [
      { value: '3', label: 'Microservice agents' },
      { value: '50', label: 'Concurrent interviews' },
      { value: '280+', label: 'Offline tests' },
      { value: '2', label: 'Dual-judge scorers' },
    ],
    overview:
      'An autonomous interview platform that runs adaptive spoken interviews and scores every candidate against the same competency bar — with explainable, evidence-backed results.',
    pillars: [
      {
        title: 'Decoupled Autonomy',
        text: 'Agents communicate only through versioned contracts over an async event bus.',
      },
      {
        title: 'Deterministic Evaluation',
        text: 'Scores are computed from validated evidence — never an opaque model summary.',
      },
      {
        title: 'Fairness-First Proctoring',
        text: 'A transparent Three-Strike Rule protects integrity without punishing glitches.',
      },
    ],
    flow: [
      'Gateway books the interview and signs a secure candidate link',
      'Planner builds a frozen blueprint from the resume and job spec',
      'Interviewer runs the live voice session with adaptive difficulty',
      'Proctoring monitors integrity and enforces the Three-Strike Rule',
      'Scorer grades responses with dual judges, blind to answer keys',
      'An explainable score and report are delivered',
    ],
    highlights: [
      {
        title: 'Code owns the questions',
        text: 'A state machine hands exact wording to the voice model; the model only handles conversational manner.',
      },
      {
        title: 'Dual-judge scoring',
        text: 'One judge grades blind to answer keys; a second audits the grade without inventing one.',
      },
      {
        title: 'Self-healing operations',
        text: 'System faults never penalize candidates — a fresh interview is scheduled automatically.',
      },
    ],
    tech: [
      'Python',
      'FastAPI',
      'Redis Streams',
      'PostgreSQL / Supabase',
      'WebSockets',
      'GPT-Live',
      'Claude Sonnet / Opus',
      'AsyncIO',
      'Docker',
      'Nginx',
      'Prometheus',
    ],
  },
  {
    id: 'talent-acquisition',
    name: 'Autonomous Recruitment & Onboarding SaaS',
    subtitle: 'Multi-Tenant Talent Acquisition Platform',
    category: 'Agentic Automation · Enterprise SaaS',
    year: '2026',
    tagline: 'Seven agents that run the entire hiring lifecycle — grounded, isolated, compliant.',
    summary:
      'Seven autonomous agents that run the full hiring lifecycle — from job posting to offer and document verification.',
    metrics: [
      { value: '7', label: 'Autonomous agents' },
      { value: '12', label: 'Pipeline stages' },
      { value: '24', label: 'DB migrations' },
      { value: '4', label: 'Security invariants' },
    ],
    overview:
      'An enterprise multi-tenant SaaS that automates the full talent-acquisition lifecycle with durable queues and deterministic guardrails.',
    pillars: [
      {
        title: 'Grounded AI',
        text: 'Models never author sensitive facts without deterministic validation.',
      },
      {
        title: 'Resilient Queues',
        text: 'Crashing workers release locked rows back to durable queues — no dropped tasks.',
      },
      {
        title: 'Tenant Isolation',
        text: "Row-Level Security and ephemeral signed URLs protect every client's data.",
      },
    ],
    flow: [
      'Requisition created and queued for drafting',
      'JD Generator writes a grounded, hallucination-checked job description',
      'Resume Screener scores candidates against an objective rubric',
      'Interview Planner sequences AI and human rounds',
      'Evaluator ranks finalists across all rounds',
      'Offer Agent drafts the package; candidate accepts and uploads documents',
    ],
    highlights: [
      {
        title: 'Zero-hallucination JD drafting',
        text: 'A deterministic composer builds the facts; an asymmetric grounding check rejects any unverified claim.',
      },
      {
        title: 'Arithmetic resume scoring',
        text: 'Evidence-based scoring with a must-have cap, shortlisting in capacity-aware waves.',
      },
      {
        title: 'One-click offer & verification',
        text: 'Drafts the offer package, collects documents, and verifies them before marking a candidate hired.',
      },
    ],
    tech: [
      'Python',
      'FastAPI',
      'PostgreSQL / Supabase',
      'Row-Level Security',
      'Claude',
      'React',
      'Google Meet API',
      'ReportLab',
      'Razorpay',
      'Docker',
    ],
  },
]

export const extraProjects: ExtraProject[] = [
  {
    name: 'Unified HRMS',
    blurb:
      'A 12-module HRMS consolidating two legacy systems, with JWT RBAC across four roles, dual login portals, and Gemini-powered employee support.',
    tech: ['FastAPI', 'Supabase', 'JWT RBAC', 'Gemini', 'LangGraph'],
    metric: '12 modules · 4 roles',
  },
  {
    name: 'SDLC Agent',
    blurb:
      'A high-concurrency real-time collaboration backend serving 100+ rooms and 5,000+ simultaneous users on a single node.',
    tech: ['Python', 'FastAPI', 'AsyncIO', 'WebSockets', 'LiveKit'],
    metric: '100+ rooms · 5k+ users',
  },
  {
    name: 'AI Stock Market Signal Automation',
    blurb:
      'An event-driven pipeline that ingests live market data, evaluates conditions, and delivers trading signals automatically.',
    tech: ['n8n', 'REST APIs', 'Lovable', 'Event-Driven'],
    metric: 'Real-time signals',
  },
]
