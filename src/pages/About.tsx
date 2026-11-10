import { firm, founder } from '../data/content'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Folio } from '../components/ui/Folio'
import { Heading } from '../components/ui/Heading'
import { Prose } from '../components/ui/Prose'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { Cta } from '../components/global/Cta'
import { Portrait } from '../components/global/Portrait'
import { Reveal } from '../components/global/Reveal'

const principles = [
  ['Vision', firm.vision],
  ['Mission', firm.mission],
  ['Guiding principle', firm.principle],
]

export default function About() {
  return (
    <>
      <PageHero eyebrow="The firm" title="Professional, responsive and client-centred">
        {firm.intro[0]}
      </PageHero>

      <Section>
        <Container className="grid items-start gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <Heading>How we work</Heading>
          </Reveal>
          <Reveal>
            <Prose>
              <p>{firm.intro[1]}</p>
              <p>{firm.intro[2]}</p>
              <p>{firm.infrastructure}</p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section tone="raise">
        <Container className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map(([title, body], i) => (
            <Reveal key={title} className="border-t border-ink/20 pt-6">
              <Folio i={i} />
              <Heading as="h3" size="md" className="mt-3 mb-4">
                {title}
              </Heading>
              <p className="m-0 text-ink-2">{body}</p>
            </Reveal>
          ))}
        </Container>
      </Section>

      <Section>
        <Container className="grid items-center gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Portrait />
          <Reveal>
            <Eyebrow>{founder.role}</Eyebrow>
            <Heading>{founder.name}</Heading>
            <p className="mt-2 mb-6 text-mute">{founder.credential}</p>
            <Prose>
              {founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Prose>
          </Reveal>
        </Container>
        <Container>
          <Reveal>
            <Heading as="h3" size="lg" className="mt-12 mb-4 text-[28px]">
              Areas of professional experience
            </Heading>
            <ul className="border-t border-ink/10 sm:columns-2 sm:gap-12">
              {founder.experience.map((e) => (
                <li key={e} className="break-inside-avoid border-b border-ink/10 py-3 text-ink-2">
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section tone="raise">
        <Container className="grid items-start gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <Heading>Our team</Heading>
          </Reveal>
          <Reveal>
            <Prose>
              <p>
                RJA is supported by paralegals, legal secretaries, court clerks and administrative staff, and runs an internship programme where law students gain exposure to legal research, court processes and client service.
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Cta />
    </>
  )
}
