import { useState, type MouseEvent, type ReactNode } from 'react'
import { firm } from '../data/content'
import { useScrolled } from '../lib/hooks'
import logoLight from './logo-light-clean.png'

export const nav = [
  ['/', 'Home'],
  ['/about', 'The firm'],
  ['/practice', 'Practice areas'],
  ['/insights', 'Insights'],
  ['/contact', 'Contact'],
] as const

// Stagger delay for the one entrance animation.
export const d = (ms: number) => ({ '--d': `${ms}ms` }) as never

export function Arrow() {
  return (
    <svg className="a-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function Header({ route }: { route: string }) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const active = (p: string) => (p === '/' ? route === '/' : route.startsWith(p))
  return (
    <header className={`a-hdr a-dark ${scrolled || open ? 'solid' : ''}`}>
      <div className="a-wrap a-hdr-in">
        <a href="#/" className="a-brand" onClick={() => setOpen(false)}>
          <img src={logoLight} alt="" />
          <span>
            Rongoma Janji &amp; Associates
            <small>Advocates</small>
          </span>
        </a>
        <nav className={`a-nav ${open ? 'open' : ''}`} aria-label="Main">
          {nav.map(([p, l]) => (
            <a key={p} href={`#${p}`} className={active(p) ? 'on' : ''} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#/contact" className="a-btn a-btn-gold a-btn-sm" onClick={() => setOpen(false)}>
            Book a consultation
          </a>
        </nav>
        <button className="a-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="a-ftr a-dark">
      <div className="a-wrap a-ftr-grid">
        <div>
          <img src={logoLight} alt="RJA" className="a-ftr-logo" />
          <p className="a-ftr-name">{firm.name}</p>
          <p className="a-ftr-values">Professionalism, integrity, inclusiveness, excellence</p>
        </div>
        <div>
          <h4>Explore</h4>
          {nav.map(([p, l]) => (
            <a key={p} href={`#${p}`}>
              {l}
            </a>
          ))}
        </div>
        <div>
          <h4>Visit</h4>
          {firm.address.map((a) => (
            <p key={a}>{a}</p>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`mailto:${firm.email}`}>{firm.email}</a>
          {firm.phones.map((p) => (
            <a key={p} href={`tel:+254${p.replace(/\s/g, '').slice(1)}`}>
              {p}
            </a>
          ))}
        </div>
      </div>
      <div className="a-wrap a-ftr-base">
        <span>© {new Date().getFullYear()} {firm.name}</span>
        <span>Advocates of the High Court of Kenya</span>
      </div>
    </footer>
  )
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="a-phero a-dark">
      <div className="a-wrap">
        <p className="a-eyebrow" data-a>{eyebrow}</p>
        <h1 data-a style={d(60)}>{title}</h1>
        {children && <p className="a-lede" data-a style={d(120)}>{children}</p>}
      </div>
    </section>
  )
}

export function Cta() {
  return (
    <section className="a-cta">
      <div className="a-wrap a-cta-in" data-a>
        <h2>Need legal advice you can rely on?</h2>
        <a href="#/contact" className="a-btn a-btn-burg">Speak to an advocate</a>
      </div>
    </section>
  )
}

// Fixed toggle so the original and /alt designs can be compared on the same page.
export function Switcher({ alt }: { alt: boolean }) {
  const go = (to: string) => (e: MouseEvent) => {
    e.preventDefault()
    window.location.assign(to + window.location.hash)
  }
  return (
    <div className="vswitch" role="group" aria-label="Design version">
      <a href="/" className={alt ? '' : 'on'} onClick={go('/')}>Original</a>
      <a href="/alt" className={alt ? 'on' : ''} onClick={go('/alt')}>Alt</a>
    </div>
  )
}
