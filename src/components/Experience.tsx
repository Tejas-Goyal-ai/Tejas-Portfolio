import { motion } from 'framer-motion'
import { experience } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          label="Experience"
          title={
            <>
              Where I've <span className="gradient-text">shipped</span>
            </>
          }
          subtitle="Two roles, five systems — each one pushing agentic AI closer to something an enterprise can rely on."
        />

        <div className="relative mt-16">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/70 via-accent-2/40 to-transparent md:left-[15px]" />

          <div className="space-y-14">
            {experience.map((job, idx) => (
              <Reveal key={job.company} delay={idx * 0.1}>
                <div className="relative pl-10 md:pl-14">
                  <span className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border border-accent/40 bg-bg md:h-8 md:w-8">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                    <span className="absolute inset-0 rounded-full ring-1 ring-accent/30 animate-pulse-ring" />
                  </span>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl font-semibold text-ink">{job.company}</h3>
                    <span className="rounded-full border border-line/70 bg-surface/50 px-3 py-1 font-mono text-[11px] text-accent">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">{job.role}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{job.blurb}</p>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,300px))]">
                    {job.projects.map((project, i) => (
                      <motion.div
                        key={project.name}
                        whileHover={{ y: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        className="gradient-border relative flex h-full min-h-[210px] flex-col rounded-2xl border border-line/60 bg-surface/50 p-6 backdrop-blur-xl"
                      >
                        <span className="font-mono text-xs text-accent/80">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h4 className="mt-3 font-display text-base font-semibold leading-snug text-ink">
                          {project.name}
                        </h4>
                        <p className="mt-2 text-[13px] leading-relaxed text-muted">
                          {project.blurb}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
