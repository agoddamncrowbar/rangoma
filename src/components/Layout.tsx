import { useState, type ReactNode } from 'react'
import { firm } from '../data/content'
import { useScrolled } from '../lib/hooks'
import logoLight from '../assets/logo-light.png'

const nav = [
  ['/', 'Home'],
  ['/about', 'The Firm'],
  ['/practice', 'Practice Areas'],
  ['/insights', 'Insights'],
  ['/contact', 'Contact'],
] as const

export function Header({ route }: { route: string }) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const active = (p: string) => (p === '/' ? route === '/' : route.startsWith(p))
  return (
    <header className={`hdr ${scrolled || open ? 'solid' : ''}`}>
      <div className="wrap hdr-in">
        <a href="#/" className="brand" onClick={() => setOpen(false)}>
          <img src={logoLight} alt="" />
          <span>
            Rongoma Janji
            <small>& Associates Advocates</small>
          </span>
        </a>
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main">
          {nav.map(([p, l]) => (
            <a key={p} href={`#${p}`} className={active(p) ? 'on' : ''} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#/contact" className="btn btn-gold nav-cta" onClick={() => setOpen(false)}>
            Book a consultation
          </a>
        </nav>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div>
          <img src={logoLight} alt="RJA" className="ftr-logo" />
          <p className="ftr-name">{firm.name}</p>
          <p className="muted-l">Professionalism · Integrity · Inclusiveness · Excellence</p>
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
      <div className="wrap ftr-base">
        <span>© {new Date().getFullYear()} {firm.name}</span>
        <span>Website demo</span>
      </div>
    </footer>
  )
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <Columns />
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <p className="lede">{children}</p>}
      </div>
    </section>
  )
}

// Fluted-column motif taken from the pillar in the RJ logo.
export function Columns() {
  return (
    <div className="columns" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} />
      ))}
    </div>
  )
}
