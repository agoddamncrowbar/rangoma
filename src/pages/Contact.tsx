import { useState, type FormEvent } from 'react'
import { firm, maps, practiceAreas } from '../data/content'
import { ApiError, sendEnquiry } from '../lib/api'
import { Button } from '../components/ui/Button'
import { Input, Select, Textarea } from '../components/ui/Field'
import { Heading } from '../components/ui/Heading'
import { Notice } from '../components/ui/Notice'
import { TextLink } from '../components/ui/TextLink'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { Reveal } from '../components/global/Reveal'

const empty = { name: '', email: '', phone: '', area: '', message: '', website: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState<{ emailed: boolean; email: string } | null>(null)

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    setErrors({})
    setFormError('')
    try {
      const res = await sendEnquiry(form)
      setDone({ emailed: res.emailed, email: form.email })
      setForm(empty)
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fields)
        setFormError(Object.keys(err.fields).length ? '' : err.message)
      } else {
        setFormError('Something went wrong. Please try again.')
      }
    } finally {
      setSending(false)
    }
  }

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
            {done ? (
              <div className="rounded-lg bg-raise p-8">
                <Heading as="h3" size="md" className="mb-2">
                  Thank you
                </Heading>
                <p className="mb-5 text-ink-2">
                  {done.emailed
                    ? `We have received your enquiry and sent a confirmation to ${done.email}. An advocate will get back to you soon.`
                    : 'We have received your enquiry. An advocate will get back to you soon.'}
                </p>
                <button type="button" onClick={() => setDone(null)} className="cursor-pointer font-medium text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
                  Send another message
                </button>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={submit} noValidate>
                {formError && <Notice tone="error">{formError}</Notice>}
                <Input label="Full name" name="name" autoComplete="name" required value={form.name} onChange={set('name')} error={errors.name} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Email" name="email" type="email" autoComplete="email" required value={form.email} onChange={set('email')} error={errors.email} />
                  <Input label="Phone (optional)" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} error={errors.phone} />
                </div>
                <Select label="Area of law (optional)" name="area" value={form.area} onChange={set('area')} error={errors.area}>
                  <option value="">Select an area</option>
                  {practiceAreas.map((a) => (
                    <option key={a.slug}>{a.title}</option>
                  ))}
                  <option>Other</option>
                </Select>
                <Textarea label="How can we help?" name="message" rows={5} required value={form.message} onChange={set('message')} error={errors.message} />
                {/* Honeypot: hidden from people, filled in by bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={set('website')} />
                  </label>
                </div>
                <Button type="submit" variant="burg" className="justify-self-start">
                  {sending ? 'Sending' : 'Send enquiry'}
                </Button>
              </form>
            )}
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
