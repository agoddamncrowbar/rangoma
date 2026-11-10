import { firm } from '../../data/content'
import { nav } from '../../data/nav'
import { Container } from './Container'
import logoLight from '../../assets/logo-light.png'

const link = 'block py-1 text-on/75 transition-colors duration-150 ease-soft hover:text-on'
const heading = 'mb-4 font-sans text-[13px] leading-4 font-medium text-gold'

export function Footer() {
  return (
    <footer data-dark className="bg-night-deep pt-20 text-on">
      <Container className="grid gap-12 text-[15px] leading-6 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <img src={logoLight} alt="RJA" className="mb-4 h-16 w-auto" />
          <p className="mb-2 font-serif text-[22px] leading-[1.2] font-medium">{firm.name}</p>
          <p className="text-sm text-on/75">Professionalism, integrity, inclusiveness, excellence</p>
        </div>
        <div>
          <h4 className={heading}>Explore</h4>
          {nav.map(([p, l]) => (
            <a key={p} href={`#${p}`} className={link}>
              {l}
            </a>
          ))}
        </div>
        <div>
          <h4 className={heading}>Visit</h4>
          {firm.address.map((a) => (
            <p key={a} className="mb-1 text-on/75">
              {a}
            </p>
          ))}
        </div>
        <div>
          <h4 className={heading}>Contact</h4>
          <a href={`mailto:${firm.email}`} className={link}>
            {firm.email}
          </a>
          {firm.phones.map((p) => (
            <a key={p} href={`tel:+254${p.replace(/\s/g, '').slice(1)}`} className={link}>
              {p}
            </a>
          ))}
        </div>
      </Container>
      <Container className="mt-16 flex flex-wrap justify-between gap-4 border-t border-on/15 py-6 text-[13px] text-on/75">
        <span>© {new Date().getFullYear()} {firm.name}</span>
        <span>Advocates of the High Court of Kenya</span>
      </Container>
    </footer>
  )
}
