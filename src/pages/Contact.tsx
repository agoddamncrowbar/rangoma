import { useState } from 'react'
import { firm, maps, practiceAreas } from '../data/content'
import { Button } from '../components/ui/Button'
import { Heading } from '../components/ui/Heading'
import { TextLink } from '../components/ui/TextLink'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { Reveal } from '../components/global/Reveal'

const field =
  'min-h-11 rounded-xs border border-ink/20 bg-card px-3 py-2.5 text-base leading-6 font-normal text-ink transition-colors duration-150 ease-soft hover:border-ink/40 focus:border-burg focus:outline-2 focus:outline-burg focus:outline-offset-0'
const label = 'grid gap-2 text-sm leading-5 font-medium text-ink'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your matter">
        Tell us a little about what you need and an advocate will get back to you.
      </PageHero>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
          <Reveal>
            <Heading as="h3" size="md" className="mb-3">
              Visit us
            </Heading>
            <div className="rounded-lg bg-raise p-6 text-ink-2">
              {firm.address.map((a) => (
                <p key={a} className="mb-1">
                  {a}
                </p>
              ))}
              <TextLink href={maps.link} external className="mt-3">
                Open in Google Maps
              </TextLink>
            </div>
            <div className="mt-4 aspect-[16/10] overflow-hidden rounded-lg border border-ink/10 bg-raise">
              <iframe
                title="Map of K.U. Plaza, Haile Selassie Avenue, Nairobi"
                src={maps.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block size-full border-0"
              />
            </div>
            <Heading as="h3" size="md" className="mt-10 mb-3">
              Call or write
            </Heading>
            {firm.phones.map((p) => (
              <p key={p} className="mb-1 text-ink-2">
                {p}
              </p>
            ))}
            <p className="mb-1">
              <TextLink href={`mailto:${firm.email}`}>{firm.email}</TextLink>
            </p>
          </Reveal>
          <Reveal>
            {sent ? (
              <div className="rounded-lg bg-raise p-8">
                <Heading as="h3" size="md" className="mb-2">
                  Thank you
                </Heading>
                <p className="m-0 text-ink-2">This is a demo form, so nothing was sent. In production, enquiries will be emailed to the firm.</p>
              </div>
            ) : (
              <form
                className="grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <label className={label}>
                  Full name
                  <input required name="name" autoComplete="name" className={field} />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={label}>
                    Email
                    <input required type="email" name="email" autoComplete="email" className={field} />
                  </label>
                  <label className={label}>
                    Phone
                    <input type="tel" name="phone" autoComplete="tel" className={field} />
                  </label>
                </div>
                <label className={label}>
                  Area of law
                  <select name="area" defaultValue="" className={field}>
                    <option value="" disabled>
                      Select an area
                    </option>
                    {practiceAreas.map((a) => (
                      <option key={a.slug}>{a.title}</option>
                    ))}
                    <option>Other</option>
                  </select>
                </label>
                <label className={label}>
                  How can we help?
                  <textarea required rows={5} name="msg" className={field} />
                </label>
                <Button type="submit" variant="burg" className="justify-self-start">
                  Send enquiry
                </Button>
              </form>
            )}
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
