import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { Reveal } from './ui/Reveal'

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: (
      <path
        d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v11A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 17.5v-11zM4 7l8 5.5L20 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    icon: (
      <path
        d="M5 3h3l1.5 5-2 1.5a12 12 0 005 5l1.5-2 5 1.5v3a2 2 0 01-2.2 2A17 17 0 013 5.2 2 2 0 015 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'LinkedIn',
    value: profile.linkedinLabel,
    href: profile.linkedin,
    icon: (
      <path
        d="M4 4h16v16H4zM8 10v6M8 7v.01M12 16v-3.5a2 2 0 014 0V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'GitHub',
    value: profile.githubLabel,
    href: profile.github,
    icon: (
      <path
        d="M12 3a9 9 0 00-2.85 17.54c.45.08.62-.2.62-.44v-1.7c-2.5.55-3.03-1.06-3.03-1.06-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.44 0-.98.35-1.78.93-2.4-.1-.23-.4-1.15.09-2.4 0 0 .75-.24 2.47.92a8.6 8.6 0 014.5 0c1.72-1.16 2.47-.92 2.47-.92.49 1.25.18 2.17.09 2.4.58.62.93 1.42.93 2.4 0 3.45-2.1 4.2-4.11 4.43.32.28.61.83.61 1.68v2.5c0 .24.16.52.62.43A9 9 0 0012 3z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative pt-10 pb-8 sm:py-16">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line/60 bg-surface/40 p-8 backdrop-blur-xl sm:p-14">
            <div className="absolute inset-0 grid-overlay opacity-60" />
            <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-accent-2/20 blur-3xl" />

            <div className="relative text-center">
              <span className="section-label justify-center">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
                Contact
                <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
              </span>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl">
                Let's build something that <span className="gradient-text">thinks</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted">
                I'm open to Generative AI engineering roles and ambitious agentic projects. The
                fastest way to reach me is email — I usually reply within a day.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v11A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 17.5v-11zM4 7l8 5.5L20 7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Send an email
                </a>
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
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  View GitHub
                </a>
              </div>
            </div>

            <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {channels.map((channel, i) => (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="gradient-border group flex flex-col items-center gap-2 rounded-2xl border border-line/60 bg-bg-soft/40 p-5 text-center"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      {channel.icon}
                    </svg>
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted">
                    {channel.label}
                  </span>
                  <span className="text-sm font-medium text-ink transition-colors group-hover:text-accent">
                    {channel.value}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
