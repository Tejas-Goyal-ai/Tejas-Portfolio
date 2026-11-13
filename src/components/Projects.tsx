import { useState } from 'react'
import { motion } from 'framer-motion'
import { extraProjects, featuredProjects, type FeaturedProject } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { ProjectModal } from './ProjectModal'

export function Projects() {
  const [active, setActive] = useState<FeaturedProject | null>(null)

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          label="Featured Projects"
          title={
            <>
              Systems built to <span className="gradient-text">run themselves</span>
            </>
          }
          subtitle="Two flagship platforms that automate entire workflows end-to-end — with deterministic guardrails at every step. Open any card for the full architecture."
        />

        <div className="mt-14 space-y-8">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <motion.button
                onClick={() => setActive(project)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="gradient-border group relative block w-full overflow-hidden rounded-3xl border border-line/60 bg-surface/50 p-6 text-left backdrop-blur-xl sm:p-9"
              >
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="chip">{project.category}</span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">{project.subtitle}</p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                      {project.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-line/60 bg-bg-soft/50 px-2.5 py-1 font-mono text-[11px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 6 && (
                        <span className="rounded-lg border border-line/60 bg-bg-soft/50 px-2.5 py-1 font-mono text-[11px] text-accent">
                          +{project.tech.length - 6}
                        </span>
                      )}
                    </div>

                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      View full architecture
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-accent transition-transform duration-300 group-hover:translate-x-1">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 self-center">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-line/60 bg-bg-soft/40 p-4 text-center"
                      >
                        <p className="font-display text-2xl font-bold gradient-text">{m.value}</p>
                        <p className="mt-1 text-[11px] leading-snug text-muted">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Reveal>
            <h3 className="mb-6 flex items-center gap-3 font-display text-lg font-semibold text-ink">
              <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
              More projects
            </h3>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {extraProjects.map((project, i) => (
              <Reveal key={project.name} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="card flex h-full flex-col p-6"
                >
                  <span className="font-mono text-[11px] text-accent">{project.metric}</span>
                  <h4 className="mt-2 font-display text-base font-semibold text-ink">
                    {project.name}
                  </h4>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">
                    {project.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line/60 bg-bg-soft/50 px-2 py-0.5 text-[10px] font-medium text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
