import { navItems, profile } from '../data/content'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line/60 py-12">
      <div className="container-x">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-line/70 bg-surface/60 font-display text-sm font-bold">
                <span className="gradient-text">TG</span>
              </span>
              <span className="font-display text-sm font-semibold text-ink">{profile.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              {profile.role} building grounded, explainable, and fair AI systems.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} {profile.name}. Designed & built with React, Tailwind & Framer Motion.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            Back to top
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 13V3M4 7l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
