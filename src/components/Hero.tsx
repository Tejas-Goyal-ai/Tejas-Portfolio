import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, quickFacts } from '../data/content'

function useTypewriter(words: string[], speed = 70, pause = 1600) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    }
    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        )
      },
      deleting ? speed / 2 : speed,
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, words, speed, pause])

  return text
}

function WelcomeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative w-full max-w-sm"
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/25 via-accent-2/15 to-transparent blur-2xl" />
      <div className="glass-strong relative overflow-hidden rounded-[2rem] p-7 text-center shadow-card">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto mb-5 h-36 w-36">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent-2 opacity-60 blur-md" />
          <span className="absolute -inset-2 animate-spin-slow rounded-full border-2 border-dashed border-accent/40" />
          <img
            src={profile.photo}
            alt={profile.name}
            className="relative h-36 w-36 rounded-full border-2 border-line/70 object-cover object-center"
            loading="eager"
          />
          <span className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full border-2 border-bg bg-gradient-to-br from-accent to-accent-2">
            <svg className="h-3.5 w-3.5 text-bg" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.5l3 3 6-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <p className="relative font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Welcome
        </p>
        <h2 className="relative mt-2 font-display text-2xl font-bold text-ink">
          Welcome to my portfolio
        </h2>
        <p className="relative mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
          Hi, I'm Tejas — a Generative AI Engineer crafting autonomous multi-agent systems,
          real-time voice AI, and automation that enterprises can trust.
        </p>

        <div className="relative mt-5 flex flex-wrap justify-center gap-2">
          <span className="chip">Multi-Agent Systems</span>
          <span className="chip">Real-Time Voice AI</span>
        </div>

        <div className="relative mt-6 flex items-center justify-center gap-2 border-t border-line/60 pt-5 text-xs text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for opportunities
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  const typed = useTypewriter(profile.roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 pb-16">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line/70 bg-surface/50 px-4 py-1.5 text-xs font-medium text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to Generative AI roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            >
              {profile.firstName}{' '}
              <span className="gradient-text">{profile.lastName}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 flex min-h-9 flex-wrap items-center font-display text-lg font-medium text-ink sm:text-2xl"
            >
              <span className="mr-2 text-muted">I am a</span>
              <span className="text-accent">{typed}</span>
              <span className="ml-0.5 inline-block h-6 w-[2px] animate-pulse bg-accent" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-primary"
              >
                Explore my work
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-ghost"
              >
                Get in touch
              </button>
              <a href={profile.resumeUrl} download className="btn-ghost">
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 grid max-w-xl grid-cols-3 gap-2.5 sm:mt-12 sm:gap-4"
            >
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-line/60 bg-surface/40 px-3 py-2.5 backdrop-blur-xl sm:px-4 sm:py-3"
                >
                  <p className="font-display text-sm font-bold text-ink sm:text-xl">
                    {fact.value}
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-muted sm:text-[11px]">{fact.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <WelcomeCard />
          </div>
        </div>
      </div>
    </section>
  )
}
