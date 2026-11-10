import { useState } from 'react'
import { firm, practiceAreas } from '../data/content'
import { PageHero } from '../components/Layout'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your matter.">
        Tell us a little about what you need and an advocate will get back to you.
      </PageHero>
      <section className="sec">
        <div className="wrap contact">
          <div data-reveal className="info">
            <h3>Visit us</h3>
            {firm.address.map((a) => (
              <p key={a}>{a}</p>
            ))}
            <h3>Call or write</h3>
            {firm.phones.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p><a href={`mailto:${firm.email}`}>{firm.email}</a></p>
            <div className="map-frame">
              <iframe
                title="Map of K.U. Plaza, Haile Selassie Avenue, Nairobi"
                src="https://www.google.com/maps?q=Kenyatta+University+Plaza,+Haile+Selassie+Avenue,+Nairobi&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <div data-reveal>
            {sent ? (
              <div className="thanks">
                <h3>Thank you.</h3>
                <p>This is a demo form, so nothing was sent. In production, enquiries will be emailed to the firm.</p>
              </div>
            ) : (
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <label>Full name<input required name="name" autoComplete="name" /></label>
                <div className="two">
                  <label>Email<input required type="email" name="email" autoComplete="email" /></label>
                  <label>Phone<input type="tel" name="phone" autoComplete="tel" /></label>
                </div>
                <label>
                  Area of law
                  <select name="area" defaultValue="">
                    <option value="" disabled>Select…</option>
                    {practiceAreas.map((a) => (
                      <option key={a.slug}>{a.title}</option>
                    ))}
                    <option>Other</option>
                  </select>
                </label>
                <label>How can we help?<textarea required rows={5} name="msg" /></label>
                <button className="btn btn-burg" type="submit">Send enquiry</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
