import { sectors, firm, founder } from '../data/content'
import { getInsights, getPracticeAreas } from '../lib/wp'
import { practiceAreas, insights as ins } from '../data/content'
import { useAsync } from '../lib/hooks'
import { Columns } from '../components/Layout'
import logoGold from '../assets/logo-gold.png'

export default function Home() {
  const areas = useAsync(getPracticeAreas, practiceAreas)
  const posts = useAsync(getInsights, ins)
  return (
    <>
      <section className="hero">
        <Columns />
        <div className="wrap hero-in">
          <div>
            <p className="eyebrow rise" style={{ '--d': '0ms' } as never}>Advocates · Nairobi CBD</p>
            <h1 className="rise" style={{ '--d': '100ms' } as never}>
              Counsel you can <em>stand on.</em>
            </h1>
            <p className="lede rise" style={{ '--d': '220ms' } as never}>
              A client-centred Nairobi law firm delivering practical, innovative and high-quality legal solutions to corporates, institutions and individuals.
            </p>
            <div className="hero-cta rise" style={{ '--d': '340ms' } as never}>
              <a href="#/contact" className="btn btn-gold">Book a consultation</a>
              <a href="#/practice" className="btn btn-ghost">Our practice areas</a>
            </div>
          </div>
          <img className="hero-mark rise" style={{ '--d': '300ms' } as never} src={logoGold} alt="Rongoma Janji & Associates monogram" />
        </div>
        <div className="wrap hero-strip">
          <span>Advocates of the High Court of Kenya</span>
          <span>{areas.length} practice areas</span>
          <span>K.U. Plaza, Haile Selassie Avenue</span>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div data-reveal>
            <p className="eyebrow dark">Who we are</p>
            <h2>A modern firm built on old-fashioned values.</h2>
          </div>
          <div data-reveal className="prose">
            <p>{firm.intro[0]}</p>
            <p>{firm.intro[1]}</p>
            <a href="#/about" className="link">More about the firm →</a>
          </div>
        </div>
        <div className="wrap values" data-reveal>
          {firm.values.map((v, i) => (
            <div key={v}>
              <b>0{i + 1}</b>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <p className="eyebrow dark">Practice areas</p>
              <h2>Where we can help.</h2>
            </div>
            <a href="#/practice" className="link">View all →</a>
          </div>
          <div className="cards">
            {areas.map((a, i) => (
              <a key={a.slug} href={`#/practice/${a.slug}`} className="card" data-reveal style={{ '--d': `${(i % 3) * 80}ms` } as never}>
                <span className="card-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
                <span className="card-go">Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec band">
        <Columns />
        <div className="wrap band-in">
          <div data-reveal>
            <p className="eyebrow">Our vision</p>
            <p className="quote">{firm.vision}</p>
          </div>
          <div data-reveal>
            <p className="eyebrow">Our mission</p>
            <p className="quote small">{firm.mission}</p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap founder">
          <div className="portrait" data-reveal aria-label="Portrait placeholder">
            <span>[ Portrait of {founder.name} ]</span>
          </div>
          <div data-reveal>
            <p className="eyebrow dark">{founder.role}</p>
            <h2>{founder.name}</h2>
            <p className="cred">{founder.credential}</p>
            <div className="prose">
              <p>{founder.bio[0]}</p>
              <p>{founder.bio[2]}</p>
            </div>
            <a href="#/about" className="link">Read full profile →</a>
          </div>
        </div>
      </section>

      <section className="sec sec-alt clients">
        <div className="wrap">
          <p className="eyebrow dark" data-reveal>Experience across sectors</p>
        </div>
        <div className="marquee" aria-label="Sectors we serve">
          <ul>
            {[...sectors, ...sectors].map((c, i) => (
              <li key={i} aria-hidden={i >= sectors.length}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="wrap">
          <p className="muted conf" data-reveal>We act for businesses, institutions and individuals. Client confidentiality is a professional duty, so we do not publish our client list.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <p className="eyebrow dark">Insights</p>
              <h2>Legal updates and guidance.</h2>
            </div>
            <a href="#/insights" className="link">All insights →</a>
          </div>
          <div className="posts">
            {posts.map((p) => (
              <article key={p.slug} className="post" data-reveal>
                <div className="post-img"><span>{p.tag}</span></div>
                <h3>{p.title}</h3>
                <p className="muted">{p.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export function CtaBand() {
  return (
    <section className="cta">
      <div className="wrap cta-in" data-reveal>
        <h2>Need legal advice you can rely on?</h2>
        <a href="#/contact" className="btn btn-gold">Speak to an advocate</a>
      </div>
    </section>
  )
}
