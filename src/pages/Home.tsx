import { firm, founder, practiceAreas, sectors } from '../data/content'
import { getPosts } from '../lib/api'
import { useFetch } from '../lib/hooks'
import { Button } from '../components/ui/Button'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Folio } from '../components/ui/Folio'
import { Heading } from '../components/ui/Heading'
import { Prose } from '../components/ui/Prose'
import { TextLink } from '../components/ui/TextLink'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Cta } from '../components/global/Cta'
import { Portrait } from '../components/global/Portrait'
import { PostGrid } from '../components/global/PostGrid'
import { PracticeList } from '../components/global/PracticeList'
import { Reveal } from '../components/global/Reveal'
import { SectionHead } from '../components/global/SectionHead'
import heroScene from '../assets/hero-scene.webp'

export default function Home() {
  const areas = practiceAreas
  const { data: posts } = useFetch(getPosts)
  return (
    <>
      <section data-dark className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-night pt-20 text-on">
        <img
          src={heroScene}
          alt="An open law report on a mahogany desk beside a window"
          width={1672}
          height={941}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-[78%_center] lg:object-[10%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(67,3,13,.82)_0%,rgba(67,3,13,.72)_55%,rgba(67,3,13,.95)_100%)] lg:bg-[linear-gradient(90deg,rgba(67,3,13,.96)_0%,rgba(67,3,13,.88)_32%,rgba(67,3,13,.3)_62%,rgba(67,3,13,0)_100%),linear-gradient(180deg,rgba(67,3,13,.7)_0%,rgba(67,3,13,0)_22%,rgba(67,3,13,0)_70%,rgba(67,3,13,.92)_100%)]"
        />
        <Container className="relative z-10 py-12 lg:py-16">
          <div className="max-w-[640px]">
            <Reveal>
              <Eyebrow onDark>Advocates, Nairobi CBD</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <Heading as="h1" size="display" className="max-w-[18ch]">
                Commercial litigation and counsel for businesses, lenders and individuals
              </Heading>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 mb-0 max-w-[36rem] text-xl leading-7 text-on/75 max-sm:text-lg">
                Rongoma Janji &amp; Associates is a Nairobi law firm acting for corporates, institutions and individuals in litigation, property, banking, employment and succession matters.
              </p>
            </Reveal>
            <Reveal delay={180} className="mt-10 flex flex-wrap gap-4">
              <Button href="#/contact">Book a consultation</Button>
              <Button href="#/practice" variant="ghost">
                Practice areas
              </Button>
            </Reveal>
          </div>
        </Container>
        <Container className="relative z-10 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-on/15 py-5 text-[13px] leading-5 text-on/75">
          <span>Advocates of the High Court of Kenya</span>
          <span>{areas.length} practice areas</span>
          <span>K.U. Plaza, Haile Selassie Avenue</span>
        </Container>
      </section>

      <Section>
        <Container className="grid items-start gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <Heading>A modern firm built on old-fashioned values</Heading>
          </Reveal>
          <Reveal>
            <Prose>
              <p>{firm.intro[0]}</p>
              <p>{firm.intro[1]}</p>
            </Prose>
            <TextLink href="#/about" className="mt-2">
              More about the firm
            </TextLink>
          </Reveal>
        </Container>
        <Container>
          <Reveal as="ul" className="mt-16 grid grid-cols-2 gap-8 border-t border-ink/10 pt-6 lg:grid-cols-4">
            {firm.values.map((v, i) => (
              <li key={v} className="flex flex-col gap-2">
                <Folio i={i} />
                <span className="font-serif text-[28px] leading-[1.1] font-medium text-burg">{v}</span>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section tone="raise">
        <Container className="grid items-start gap-8 lg:grid-cols-[4fr_8fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>Practice areas</Eyebrow>
            <Heading>Where we can help</Heading>
            <p className="mt-4 mb-6 max-w-[28rem] text-[17px] leading-7 text-ink-2">
              Commercial litigation is our principal work, with depth across property, finance, employment and succession.
            </p>
            <TextLink href="#/practice">All practice areas</TextLink>
          </Reveal>
          <PracticeList areas={areas} />
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow onDark>Our vision</Eyebrow>
            <p className="m-0 font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.3] font-medium">{firm.vision}</p>
          </Reveal>
          <Reveal className="max-lg:border-t max-lg:border-on/15 max-lg:pt-8 lg:border-l lg:border-on/15 lg:pl-12">
            <Eyebrow onDark>Our mission</Eyebrow>
            <p className="m-0 font-serif text-[clamp(20px,1.9vw,24px)] leading-[1.3] font-medium text-on/75">{firm.mission}</p>
          </Reveal>
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
              <p>{founder.bio[0]}</p>
              <p>{founder.bio[2]}</p>
            </Prose>
            <TextLink href="#/about" className="mt-2">
              Read full profile
            </TextLink>
          </Reveal>
        </Container>
      </Section>

      <Section tone="raise">
        <Container>
          <SectionHead
            eyebrow="Experience across sectors"
            title="Who we act for"
            aside={<p className="m-0 max-w-sm text-sm leading-5 text-mute">Client confidentiality is a professional duty, so we do not publish our client list.</p>}
          />
          <Reveal as="ul" className="grid gap-x-12 border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => (
              <li key={s} className="border-b border-ink/10 py-4 font-serif text-[22px] leading-7 font-medium text-burg">
                {s}
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      {posts && posts.length > 0 && (
        <Section>
          <Container>
            <SectionHead eyebrow="Insights" title="Legal updates and guidance" aside={<TextLink href="#/insights">All insights</TextLink>} />
            <PostGrid posts={posts.slice(0, 3)} />
          </Container>
        </Section>
      )}

      <Cta />
    </>
  )
}
