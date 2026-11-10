import { useState } from 'react'
import { firm, founder, practiceAreas, sectors, type PracticeArea } from '../data/content'
import { getPracticeAreas } from '../lib/wp'
import { useAsync } from '../lib/hooks'
import heroScene from './hero-scene.webp'
import { altInsights, folio, getPost, loadPosts, mapEmbed, mapsUrl, type AltPost } from './altContent'
import { Arrow, Cta, PageHero, d } from './AltLayout'

function IndexList({ areas }: { areas: PracticeArea[] }) {
  return (
    <div className="a-rows">
      {areas.map((a, i) => (
        <a key={a.slug} href={`#/practice/${a.slug}`} className="a-row" data-a>
          <span className="a-num">{folio(i)}</span>
          <div>
            <h3>{a.title}</h3>
            <p>{a.summary}</p>
          </div>
          <Arrow />
        </a>
      ))}
    </div>
  )
}

function Portrait() {
  return (
    <div className="a-portrait" data-a role="img" aria-label={`Portrait of ${founder.name} to be added`}>
      <span className="a-portrait-mark">BRJ</span>
      <span className="a-portrait-cap">{founder.role}</span>
    </div>
  )
}

const topicIcons: Record<string, string> = {
  Property: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  Employment: 'M3 8h18v12H3zM9 8V4h6v4M3 14h18',
  Succession: 'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6',
  Litigation: 'M12 4v16M6 20h12M4 8h16M7 8l-3 7a3 3 0 006 0zM17 8l-3 7a3 3 0 006 0z',
  Banking: 'M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 20h18',
  Criminal: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
}

function Thumb({ post }: { post: AltPost }) {
  if (post.thumb) return <img className="a-thumb" src={post.thumb} alt="" loading="lazy" />
  return (
    <div className="a-thumb a-thumb-tile" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d={topicIcons[post.tag] ?? topicIcons.Succession} />
      </svg>
    </div>
  )
}

function Posts({ posts }: { posts: AltPost[] }) {
  return (
    <div className="a-posts">
      {posts.map((p) => {
        const inner = (
          <>
            <Thumb post={p} />
            <p className="a-tag">{p.tag}</p>
            <h3>{p.title}</h3>
            {p.excerpt && <p className="a-excerpt">{p.excerpt}</p>}
            <p className="a-meta">
              {p.date}
              {p.read && ` · ${p.read}`}
            </p>
          </>
        )
        return p.body ? (
          <a key={p.slug} href={`#/insights/${p.slug}`} className="a-post a-post-link" data-a>
            {inner}
          </a>
        ) : (
          <article key={p.slug} className="a-post" data-a>
            {inner}
          </article>
        )
      })}
    </div>
  )
}

export function AltHome() {
  const areas = useAsync(getPracticeAreas, practiceAreas)
  const posts = useAsync(loadPosts, altInsights)
  return (
    <>
      <section className="a-hero a-dark">
        <img className="a-hero-bg" src={heroScene} alt="An open law report on a mahogany desk beside a window" width={1672} height={941} fetchPriority="high" />
        <div className="a-hero-shade" aria-hidden="true" />
        <div className="a-wrap a-hero-in">
          <div>
            <p className="a-eyebrow" data-a style={d(0)}>Advocates, Nairobi CBD</p>
            <h1 data-a style={d(60)}>Commercial litigation and counsel for businesses, lenders and individuals</h1>
            <p className="a-lede" data-a style={d(120)}>
              Rongoma Janji &amp; Associates is a Nairobi law firm acting for corporates, institutions and individuals in litigation, property, banking, employment and succession matters.
            </p>
            <div className="a-cta-row" data-a style={d(180)}>
              <a href="#/contact" className="a-btn a-btn-gold">Book a consultation</a>
              <a href="#/practice" className="a-btn a-btn-ghost">Practice areas</a>
            </div>
          </div>
        </div>
        <div className="a-wrap a-strip">
          <span>Advocates of the High Court of Kenya</span>
          <span>{areas.length} practice areas</span>
          <span>K.U. Plaza, Haile Selassie Avenue</span>
        </div>
      </section>

      <section className="a-sec">
        <div className="a-wrap a-split">
          <div data-a>
            <p className="a-eyebrow">Who we are</p>
            <h2>A modern firm built on old-fashioned values</h2>
          </div>
          <div data-a className="a-prose">
            <p>{firm.intro[0]}</p>
            <p>{firm.intro[1]}</p>
            <a href="#/about" className="a-link">More about the firm</a>
          </div>
        </div>
        <ul className="a-wrap a-values" data-a>
          {firm.values.map((v, i) => (
            <li key={v}>
              <span className="a-num">{folio(i)}</span>
              <span className="a-val">{v}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="a-sec a-sec-alt">
        <div className="a-wrap a-index">
          <div className="a-index-head" data-a>
            <p className="a-eyebrow">Practice areas</p>
            <h2>Where we can help</h2>
            <p className="a-sub">Commercial litigation is our principal work, with depth across property, finance, employment and succession.</p>
            <a href="#/practice" className="a-link">All practice areas</a>
          </div>
          <IndexList areas={areas} />
        </div>
      </section>

      <section className="a-sec a-band a-dark">
        <div className="a-wrap a-band-in">
          <div data-a>
            <p className="a-eyebrow">Our vision</p>
            <p className="a-quote">{firm.vision}</p>
          </div>
          <div data-a>
            <p className="a-eyebrow">Our mission</p>
            <p className="a-quote a-quote-sm">{firm.mission}</p>
          </div>
        </div>
      </section>

      <section className="a-sec">
        <div className="a-wrap a-founder">
          <Portrait />
          <div data-a>
            <p className="a-eyebrow">{founder.role}</p>
            <h2>{founder.name}</h2>
            <p className="a-cred">{founder.credential}</p>
            <div className="a-prose">
              <p>{founder.bio[0]}</p>
              <p>{founder.bio[2]}</p>
            </div>
            <a href="#/about" className="a-link">Read full profile</a>
          </div>
        </div>
      </section>

      <section className="a-sec a-sec-alt">
        <div className="a-wrap">
          <div className="a-sec-head" data-a>
            <div>
              <p className="a-eyebrow">Experience across sectors</p>
              <h2>Who we act for</h2>
            </div>
            <p className="a-note">Client confidentiality is a professional duty, so we do not publish our client list.</p>
          </div>
          <ul className="a-sectors" data-a>
            {sectors.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="a-sec">
        <div className="a-wrap">
          <div className="a-sec-head" data-a>
            <div>
              <p className="a-eyebrow">Insights</p>
              <h2>Legal updates and guidance</h2>
            </div>
            <a href="#/insights" className="a-link">All insights</a>
          </div>
          <Posts posts={posts.slice(0, 3)} />
        </div>
      </section>

      <Cta />
    </>
  )
}

export function AltAbout() {
  return (
    <>
      <PageHero eyebrow="The firm" title="Professional, responsive and client-centred">
        {firm.intro[0]}
      </PageHero>
      <section className="a-sec">
        <div className="a-wrap a-split">
          <div data-a>
            <h2>How we work</h2>
          </div>
          <div className="a-prose" data-a>
            <p>{firm.intro[1]}</p>
            <p>{firm.intro[2]}</p>
            <p>{firm.infrastructure}</p>
          </div>
        </div>
      </section>
      <section className="a-sec a-sec-alt">
        <div className="a-wrap a-trio">
          {[
            ['Vision', firm.vision],
            ['Mission', firm.mission],
            ['Guiding principle', firm.principle],
          ].map(([t, b], i) => (
            <div key={t} className="a-tri" data-a>
              <span className="a-num">{folio(i)}</span>
              <h3>{t}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="a-sec">
        <div className="a-wrap a-founder">
          <Portrait />
          <div data-a>
            <p className="a-eyebrow">{founder.role}</p>
            <h2>{founder.name}</h2>
            <p className="a-cred">{founder.credential}</p>
            <div className="a-prose">
              {founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="a-wrap" data-a>
          <h3 className="a-subhead">Areas of professional experience</h3>
          <ul className="a-list">
            {founder.experience.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="a-sec a-sec-alt">
        <div className="a-wrap a-split">
          <div data-a>
            <h2>Our team</h2>
          </div>
          <div className="a-prose" data-a>
            <p>
              RJA is supported by paralegals, legal secretaries, court clerks and administrative staff, and runs an internship programme where law students gain exposure to legal research, court processes and client service.
            </p>
          </div>
        </div>
      </section>
      <Cta />
    </>
  )
}

export function AltPracticeList() {
  const areas = useAsync(getPracticeAreas, practiceAreas)
  return (
    <>
      <PageHero eyebrow="Practice areas" title="Litigation-led, with depth across property, finance and succession">
        Our advocates act for businesses, institutions and individuals, from property and corporate work to litigation and probate.
      </PageHero>
      <section className="a-sec">
        <div className="a-wrap a-rows-wide">
          <IndexList areas={areas} />
        </div>
      </section>
      <Cta />
    </>
  )
}

export function AltPracticeDetail({ slug }: { slug: string }) {
  const areas = useAsync(getPracticeAreas, practiceAreas)
  const a = areas.find((x) => x.slug === slug)
  if (!a)
    return (
      <PageHero eyebrow="Practice areas" title="Practice area not found">
        <a href="#/practice" className="a-link">Back to all practice areas</a>
      </PageHero>
    )
  const others = areas.filter((x) => x.slug !== slug).slice(0, 5)
  return (
    <>
      <PageHero eyebrow="Practice area" title={a.title}>
        {a.summary}
      </PageHero>
      <section className="a-sec">
        <div className="a-wrap a-detail">
          <div className="a-prose" data-a>
            <p>{a.detail}</p>
            {a.services.length > 0 && (
              <>
                <h3 className="a-subhead">What we handle</h3>
                <ol className="a-ticks">
                  {a.services.map((s, i) => (
                    <li key={s}>
                      <span className="a-num">{folio(i)}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </>
            )}
            <a href="#/contact" className="a-btn a-btn-burg">Discuss your matter</a>
          </div>
          <aside className="a-side" data-a>
            <h4>Other practice areas</h4>
            {others.map((o) => (
              <a key={o.slug} href={`#/practice/${o.slug}`}>{o.title}</a>
            ))}
          </aside>
        </div>
      </section>
    </>
  )
}

export function AltInsights() {
  const posts = useAsync(loadPosts, altInsights)
  return (
    <>
      <PageHero eyebrow="Insights" title="Legal updates and guidance">
        Notes from our advocates on property, employment, succession and commercial disputes.
      </PageHero>
      <section className="a-sec">
        <div className="a-wrap">
          <Posts posts={posts} />
        </div>
      </section>
    </>
  )
}

export function AltContact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your matter">
        Tell us a little about what you need and an advocate will get back to you.
      </PageHero>
      <section className="a-sec">
        <div className="a-wrap a-contact">
          <div data-a className="a-info">
            <h3>Visit us</h3>
            <div className="a-addr">
              {firm.address.map((a) => (
                <p key={a}>{a}</p>
              ))}
              <a href={mapsUrl} className="a-link" target="_blank" rel="noreferrer">Open in Google Maps</a>
            </div>
            <div className="a-map">
              <iframe title="Map of K.U. Plaza, Haile Selassie Avenue, Nairobi" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <h3>Call or write</h3>
            {firm.phones.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p><a href={`mailto:${firm.email}`} className="a-link">{firm.email}</a></p>
          </div>
          <div data-a>
            {sent ? (
              <div className="a-thanks">
                <h3>Thank you</h3>
                <p>This is a demo form, so nothing was sent. In production, enquiries will be emailed to the firm.</p>
              </div>
            ) : (
              <form
                className="a-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <label>Full name<input required name="name" autoComplete="name" /></label>
                <div className="a-two">
                  <label>Email<input required type="email" name="email" autoComplete="email" /></label>
                  <label>Phone<input type="tel" name="phone" autoComplete="tel" /></label>
                </div>
                <label>
                  Area of law
                  <select name="area" defaultValue="">
                    <option value="" disabled>Select an area</option>
                    {practiceAreas.map((a) => (
                      <option key={a.slug}>{a.title}</option>
                    ))}
                    <option>Other</option>
                  </select>
                </label>
                <label>How can we help?<textarea required rows={5} name="msg" /></label>
                <button className="a-btn a-btn-burg" type="submit">Send enquiry</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export function AltArticle({ slug }: { slug: string }) {
  const posts = useAsync(loadPosts, altInsights)
  const post = getPost(posts, slug)
  if (!post || !post.body)
    return (
      <PageHero eyebrow="Insights" title="Article not found">
        <a href="#/insights" className="a-link">Back to all insights</a>
      </PageHero>
    )
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3)
  return (
    <>
      <PageHero eyebrow={post.tag} title={post.title}>
        {post.excerpt}
      </PageHero>
      <section className="a-sec">
        <div className="a-wrap a-article">
          <div className="a-art-meta" data-a>
            <span>{post.date}</span>
            {post.read && <span>{post.read}</span>}
            <span>Rongoma Janji &amp; Associates</span>
          </div>
          <div className="a-art-body" data-a>
            {post.body.map((b, i) => (
              <div key={i}>
                {b.h && <h3>{b.h}</h3>}
                {b.p.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            ))}
            <p className="a-disclaimer">This article is general information and not legal advice. The right steps depend on the facts of your matter, so speak to an advocate before you act.</p>
            <a href="#/insights" className="a-link">All insights</a>
          </div>
        </div>
      </section>
      <section className="a-sec a-sec-alt">
        <div className="a-wrap">
          <div className="a-sec-head" data-a>
            <h2>More insights</h2>
          </div>
          <Posts posts={more} />
        </div>
      </section>
      <Cta />
    </>
  )
}
