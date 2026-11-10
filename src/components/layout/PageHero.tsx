import type { ReactNode } from 'react'
import { Columns } from '../ui/Columns'
import { Eyebrow } from '../ui/Eyebrow'
import { Heading } from '../ui/Heading'
import { Reveal } from '../global/Reveal'
import { Container } from './Container'

type Props = { eyebrow: string; title: string; children?: ReactNode }

export function PageHero({ eyebrow, title, children }: Props) {
  return (
    <section
      data-dark
      className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_80%_0%,#7a1024_0%,#5f0614_45%,#43030d_100%)] pt-32 pb-14 text-on sm:pt-[168px] sm:pb-24"
    >
      <Columns />
      <Container className="relative z-10">
        <Reveal>
          <Eyebrow label>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <Heading as="h1" size="page">
            {title}
          </Heading>
        </Reveal>
        {children && (
          <Reveal delay={120}>
            <p className="mt-6 mb-0 max-w-[40rem] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-[#f6f0e4]/85">{children}</p>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
