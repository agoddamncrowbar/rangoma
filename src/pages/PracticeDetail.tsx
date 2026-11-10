import { practiceAreas } from '../data/content'
import { getPracticeAreas } from '../lib/wp'
import { useAsync } from '../lib/hooks'
import { Button } from '../components/ui/Button'
import { Folio } from '../components/ui/Folio'
import { Heading } from '../components/ui/Heading'
import { Prose } from '../components/ui/Prose'
import { TextLink } from '../components/ui/TextLink'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { Reveal } from '../components/global/Reveal'

export default function PracticeDetail({ slug }: { slug: string }) {
  const areas = useAsync(getPracticeAreas, practiceAreas)
  const a = areas.find((x) => x.slug === slug)
  if (!a)
    return (
      <PageHero eyebrow="Practice areas" title="Practice area not found">
        <TextLink href="#/practice" onDark>
          Back to all practice areas
        </TextLink>
      </PageHero>
    )
  const others = areas.filter((x) => x.slug !== slug).slice(0, 5)
  return (
    <>
      <PageHero eyebrow="Practice area" title={a.title}>
        {a.summary}
      </PageHero>
      <Section>
        <Container className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal>
            <Prose>
              <p>{a.detail}</p>
            </Prose>
            {a.services.length > 0 && (
              <>
                <Heading as="h3" size="lg" className="mt-12 mb-4 text-[28px]">
                  What we handle
                </Heading>
                <ol className="mb-10 border-t border-ink/10">
                  {a.services.map((s, i) => (
                    <li key={s} className="grid grid-cols-[40px_1fr] gap-4 border-b border-ink/10 py-4 text-ink-2">
                      <Folio i={i} className="pt-[5px]" />
                      {s}
                    </li>
                  ))}
                </ol>
              </>
            )}
            <Button href="#/contact" variant="burg">
              Discuss your matter
            </Button>
          </Reveal>
          <Reveal className="rounded-lg border border-ink/10 bg-card p-6 lg:sticky lg:top-28">
            <Heading as="h4" size="sm" className="mb-2">
              Other practice areas
            </Heading>
            {others.map((o) => (
              <a key={o.slug} href={`#/practice/${o.slug}`} className="block border-b border-ink/10 py-3 text-[15px] text-ink-2 transition-colors duration-150 ease-soft last:border-0 last:pb-0 hover:text-burg">
                {o.title}
              </a>
            ))}
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
