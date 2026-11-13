import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  SiPython,
  SiClaude,
  SiOllama,
  SiFastapi,
  SiLangchain,
  SiLanggraph,
  SiHuggingface,
  SiPostgresql,
  SiSupabase,
  SiRedis,
  SiLivekit,
  SiWebrtc,
  SiHtml5,
  SiCss,
  SiReact,
  SiStreamlit,
  SiDocker,
  SiKubernetes,
  SiGithub,
  SiN8N,
  SiJsonwebtokens,
  SiGoogle,
  SiRazorpay,
  SiSocketdotio,
} from 'react-icons/si'
import {
  TbBrandOpenai,
  TbTopologyStar3,
  TbRoute,
  TbBinary,
  TbMessageChatbot,
  TbVector,
  TbSparkles,
  TbWaveSine,
  TbServer,
  TbApi,
  TbShieldLock,
  TbDatabase,
  TbArrowsShuffle,
  TbCode,
} from 'react-icons/tb'
import { skillGroups } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const marqueeSkills = [
  'Python',
  'FastAPI',
  'Multi-Agent Systems',
  'Redis Streams',
  'GPT-Live',
  'Anthropic Claude',
  'WebSockets',
  'RAG',
  'PostgreSQL',
  'Supabase',
  'LangChain',
  'LiveKit',
  'Docker',
  'Kubernetes',
  'AsyncIO',
  'LangGraph',
  'React',
  'n8n',
]

const totalSkills = skillGroups.reduce((n, g) => n + g.items.length, 0)

const iconMap: Record<string, IconType> = {
  Python: SiPython,
  'Multi-Agent Systems': TbTopologyStar3,
  'Agentic Workflows': TbRoute,
  RAG: TbBinary,
  'Prompt Engineering': TbMessageChatbot,
  'Vector Embeddings': TbVector,
  'Anthropic Claude': SiClaude,
  'OpenAI GPT-4o & GPT-Live': TbBrandOpenai,
  Cohere: TbSparkles,
  Ollama: SiOllama,
  FastAPI: SiFastapi,
  LangChain: SiLangchain,
  LangGraph: SiLanggraph,
  'Hugging Face': SiHuggingface,
  AsyncIO: TbArrowsShuffle,
  WebSockets: SiSocketdotio,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  'Redis Streams': SiRedis,
  ChromaDB: TbDatabase,
  LiveKit: SiLivekit,
  WebRTC: SiWebrtc,
  'HTML5 Media APIs': SiHtml5,
  'Full-Duplex Audio': TbWaveSine,
  React: SiReact,
  Streamlit: SiStreamlit,
  HTML5: SiHtml5,
  CSS: SiCss,
  Docker: SiDocker,
  'Docker Compose': SiDocker,
  Kubernetes: SiKubernetes,
  Uvicorn: TbServer,
  'Git / GitHub': SiGithub,
  n8n: SiN8N,
  'REST APIs': TbApi,
  JWT: SiJsonwebtokens,
  'Google OAuth': SiGoogle,
  'HMAC Signatures': TbShieldLock,
  Razorpay: SiRazorpay,
}

function getIcon(name: string): IconType {
  return iconMap[name] ?? TbCode
}

function Marquee() {
  const row = [...marqueeSkills, ...marqueeSkills]
  return (
    <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-3">
        {row.map((skill, i) => {
          const Icon = getIcon(skill)
          return (
            <span
              key={`${skill}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line/60 bg-surface/40 px-4 py-2 text-sm font-medium text-muted"
            >
              <Icon className="h-4 w-4 text-accent" />
              {skill}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl font-bold leading-none gradient-text">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
    </div>
  )
}

export function Skills() {
  const [active, setActive] = useState(1)
  const group = skillGroups[active]

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label="Tech Stack"
            title={
              <>
                The toolkit behind the <span className="gradient-text">agentic stack</span>
              </>
            }
            subtitle="From real-time voice transport to durable work queues — the technologies I use to take AI systems from prototype to production."
          />
          <Reveal delay={0.1}>
            <div className="flex gap-10">
              <Stat value={skillGroups.length} label="Domains" />
              <Stat value={totalSkills} label="Tools" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-10">
        <Marquee />
      </div>

      <div className="container-x mt-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,300px)_1fr]">
          <Reveal className="h-full">
            <div className="flex h-full gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {skillGroups.map((g, i) => {
                const isActive = active === i
                return (
                  <button
                    key={g.title}
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 lg:w-full ${
                      isActive
                        ? 'border-accent/50 bg-surface/70'
                        : 'border-line/50 bg-surface/30 hover:border-line/80 hover:bg-surface/50'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skill-rail-active"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-2xl border border-accent/50 bg-surface/70"
                      />
                    )}
                    <span
                      className={`relative font-mono text-xs font-semibold ${
                        isActive ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`relative flex-1 whitespace-nowrap text-sm font-semibold transition-colors duration-300 ${
                        isActive ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {g.title}
                    </span>
                    <span
                      className={`relative grid h-6 min-w-6 place-items-center rounded-full px-1.5 font-mono text-[11px] font-semibold transition-colors duration-300 ${
                        isActive ? 'bg-accent/15 text-accent' : 'bg-bg-soft/60 text-muted'
                      }`}
                    >
                      {g.items.length}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex items-center justify-center">
            <div className="gradient-border relative w-full overflow-hidden rounded-3xl border border-line/60 bg-surface/50 p-6 backdrop-blur-xl sm:p-8 lg:max-w-[68%]">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-accent-2/10 blur-3xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs font-semibold text-accent">
                        {String(active + 1).padStart(2, '0')} / {String(skillGroups.length).padStart(2, '0')}
                      </span>
                      <h3 className="mt-1.5 font-display text-2xl font-bold text-ink sm:text-3xl">
                        {group.title}
                      </h3>
                    </div>
                    <span className="chip shrink-0">
                      {group.items.length} {group.items.length === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>

                  <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted">{group.blurb}</p>

                  <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {group.items.map((item, i) => {
                      const Icon = getIcon(item)
                      return (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.04 + i * 0.03, duration: 0.35 }}
                          className="flex items-center gap-2 rounded-lg border border-line/60 bg-bg-soft/40 px-2.5 py-1.5 transition-colors duration-300 hover:border-accent/40 hover:bg-surface/70"
                        >
                          <Icon className="h-4 w-4 shrink-0 text-accent" />
                          <span className="truncate text-xs font-medium text-ink">{item}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
