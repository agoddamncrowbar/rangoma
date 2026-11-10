import { useState } from 'react'
import { useScrolled } from '../../lib/hooks'
import { cx } from '../../lib/cx'
import { nav } from '../../data/nav'
import { Button } from '../ui/Button'
import { Container } from './Container'
import logoLight from '../../assets/logo-light.png'

export function Header({ route }: { route: string }) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const active = (p: string) => (p === '/' ? route === '/' : route.startsWith(p))
  const close = () => setOpen(false)
  return (
    <header
      data-dark
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b text-on transition-[background-color,border-color] duration-200 ease-soft',
        scrolled || open ? 'border-on/15 bg-night' : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <a href="#/" onClick={close} className="flex items-center gap-3 font-serif text-lg leading-[1.1] font-medium sm:text-xl">
          <img src={logoLight} alt="" className="h-9 w-auto sm:h-10" />
          <span>
            Rongoma Janji &amp; Associates
            <small className="mt-0.5 block font-sans text-xs leading-4 font-normal text-gold">Advocates</small>
          </span>
        </a>
        <nav
          aria-label="Main"
          className={cx(
            'fixed inset-x-0 top-20 flex flex-col items-stretch border-b border-on/15 bg-night px-6 pt-2 pb-6 text-sm font-medium transition-[opacity,transform,visibility] duration-200 ease-soft',
            'lg:static lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0',
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0 lg:visible lg:translate-y-0 lg:opacity-100',
          )}
        >
          {nav.map(([p, l]) => (
            <a
              key={p}
              href={`#${p}`}
              onClick={close}
              className={cx(
                'border-b border-on/15 py-4 text-base underline decoration-1 underline-offset-8 transition-[color,text-decoration-color] duration-150 ease-soft',
                'lg:border-0 lg:py-1 lg:text-sm',
                active(p) ? 'text-on decoration-transparent lg:decoration-gold' : 'text-on/75 decoration-transparent hover:text-on',
              )}
            >
              {l}
            </a>
          ))}
          <Button href="#/contact" size="sm" onClick={close} className="max-lg:mt-4 max-lg:h-12">
            Book a consultation
          </Button>
        </nav>
        <button className="relative size-11 cursor-pointer lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={cx('absolute top-[17px] right-2.5 left-2.5 h-0.5 bg-on transition-transform duration-200 ease-soft', open && 'translate-y-1 rotate-45')} />
          <span className={cx('absolute top-[25px] right-2.5 left-2.5 h-0.5 bg-on transition-transform duration-200 ease-soft', open && '-translate-y-1 -rotate-45')} />
        </button>
      </Container>
    </header>
  )
}
