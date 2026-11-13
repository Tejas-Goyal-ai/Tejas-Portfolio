import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { navItems, profile } from '../data/content'
import { ThemeSwitcher } from './ThemeSwitcher'

const sectionIds = navItems.map((n) => n.id)

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setMenuOpen(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent-2)), rgb(var(--accent-3)))',
        }}
      />
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <div className="container-x">
          <nav
            className={`flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500 ${
              scrolled ? 'glass-strong shadow-card' : 'border border-transparent'
            }`}
          >
            <button
              onClick={() => go('home')}
              className="group flex items-center gap-2.5 pl-1"
              aria-label="Go to top"
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-line/70 bg-surface/60">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-full w-full object-cover object-center"
                />
                <span className="absolute inset-0 rounded-xl ring-1 ring-accent/0 transition group-hover:ring-accent/50" />
              </span>
              <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
                {profile.name}
              </span>
            </button>

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active === item.id ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/15 ring-1 ring-accent/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <button
                onClick={() => go('contact')}
                className="hidden rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-xs font-semibold text-bg shadow-glow transition-transform hover:-translate-y-0.5 md:inline-flex"
              >
                Let's talk
              </button>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-line/70 bg-surface/50 text-ink lg:hidden"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <span
                    className={`h-0.5 w-5 rounded bg-current transition-transform ${
                      menuOpen ? 'translate-y-2 rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 w-5 rounded bg-current transition-opacity ${
                      menuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 w-5 rounded bg-current transition-transform ${
                      menuOpen ? '-translate-y-2 -rotate-45' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-strong mt-2 overflow-hidden rounded-2xl lg:hidden"
              >
                <div className="flex flex-col p-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => go(item.id)}
                      className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        active === item.id
                          ? 'bg-accent/15 text-ink'
                          : 'text-muted hover:bg-surface-2/70 hover:text-ink'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
