import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
}: {
  label: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <span className="section-label">
          <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
