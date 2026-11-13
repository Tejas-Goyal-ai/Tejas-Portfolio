import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { FeaturedProject } from '../data/content'

export function ProjectModal({
  project,
  onClose,
}: {
  project: FeaturedProject | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="glass-strong relative my-4 w-full max-w-4xl overflow-hidden rounded-3xl shadow-card"
          >
            <div className="relative border-b border-line/60 p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="chip mb-3">{project.category}</span>
                  <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{project.subtitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/70 bg-surface/60 text-muted transition-colors hover:text-ink"
                  aria-label="Close"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4l8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-line/60 bg-surface/50 p-3">
                    <p className="font-display text-xl font-bold gradient-text">{m.value}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-h-[60vh] space-y-8 overflow-y-auto p-6 sm:p-8">
              <div>
                <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                  Overview
                </h4>
                <p className="text-sm leading-relaxed text-muted">{project.overview}</p>
              </div>

              <div>
                <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                  Engineering Principles
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.pillars.map((p) => (
                    <div key={p.title} className="rounded-xl border border-line/60 bg-surface/40 p-4">
                      <p className="text-sm font-semibold text-ink">{p.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                  End-to-End Flow
                </h4>
                <ol className="relative space-y-3 border-l border-line/60 pl-6">
                  {project.flow.map((step, i) => (
                    <li key={step} className="relative text-sm text-muted">
                      <span className="absolute -left-[31px] grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-[10px] font-bold text-bg">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                  What Makes It Interesting
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.highlights.map((h) => (
                    <div key={h.title} className="rounded-xl border border-line/60 bg-surface/40 p-4">
                      <p className="text-sm font-semibold text-ink">{h.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">{h.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                  Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
