import { motion } from 'framer-motion'
import { certifications, education, profile } from '../data/content'
import { Reveal, staggerContainer, staggerItem } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const focus = [
  'Multi-Agent Systems',
  'Real-Time Voice AI',
  'Grounded LLM Pipelines',
  'Explainable Evaluation',
  'High-Concurrency Backends',
]

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          label="About"
          title={
            <>
              Engineering AI systems you can
              <span className="gradient-text"> actually trust</span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right" className="h-full">
            <div className="relative h-full">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/15 via-accent-2/10 to-transparent blur-2xl" />
              <div className="glass relative flex h-full flex-col justify-center overflow-hidden rounded-3xl p-6 shadow-card">
                <div className="relative mx-auto mb-6 grid h-48 w-48 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent-2 opacity-40 blur-md" />
                  <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-accent/30" />
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="relative h-44 w-44 rounded-full border-2 border-line/70 object-cover object-center"
                    loading="lazy"
                  />
                </div>

                <div className="text-center">
                  <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {profile.name}
                  </p>
                  <p className="mt-1 text-base text-accent">{profile.role}</p>
                  <p className="mt-1 text-sm text-muted">{profile.location}</p>
                </div>

                <div className="mt-6 space-y-2.5 border-t border-line/60 pt-6">
                  {focus.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-3 border-t border-line/60 pt-6">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-line/70 bg-surface/50 text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4h16v16H4zM8 10v6M8 7v.01M12 16v-3.5a2 2 0 014 0V16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-line/70 bg-surface/50 text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3a9 9 0 00-2.85 17.54c.45.08.62-.2.62-.44v-1.7c-2.5.55-3.03-1.06-3.03-1.06-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.44 0-.98.35-1.78.93-2.4-.1-.23-.4-1.15.09-2.4 0 0 .75-.24 2.47.92a8.6 8.6 0 014.5 0c1.72-1.16 2.47-.92 2.47-.92.49 1.25.18 2.17.09 2.4.58.62.93 1.42.93 2.4 0 3.45-2.1 4.2-4.11 4.43.32.28.61.83.61 1.68v2.5c0 .24.16.52.62.43A9 9 0 0012 3z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex h-full flex-col justify-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-5"
            >
              {profile.about.map((para) => (
                <motion.p
                  key={para}
                  variants={staggerItem}
                  className="text-base leading-relaxed text-muted"
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <div className="card h-full p-5">
                  <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-ink">
                    <svg className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 3L2 7l8 4 8-4-8-4zM2 13l8 4 8-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Education
                  </h3>
                  <div className="space-y-4">
                    {education.map((e) => (
                      <div key={e.school}>
                        <p className="text-sm font-medium text-ink">{e.school}</p>
                        <p className="text-xs text-muted">{e.detail}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-accent">{e.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="card h-full p-5">
                  <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-ink">
                    <svg className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 12l-2 6 6-2 6 2-2-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    Certifications
                  </h3>
                  <div className="space-y-4">
                    {certifications.map((c) => (
                      <a
                        key={c.name}
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group -mx-2 flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-2/60"
                      >
                        <span>
                          <span className="block text-sm font-medium text-ink transition-colors group-hover:text-accent">
                            {c.name}
                          </span>
                          <span className="block text-xs text-muted">{c.issuer}</span>
                          <span className="mt-0.5 block font-mono text-[11px] text-accent">{c.year}</span>
                        </span>
                        <svg
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-accent"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M6 3h7v7M13 3L5 11M10 9v4H3V6h4"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
