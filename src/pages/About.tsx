import { firm, founder } from '../data/content'
import { PageHero } from '../components/Layout'
import { CtaBand } from './Home'

export default function About() {
  return (
    <>
      <PageHero eyebrow="The firm" title="Professional, responsive and client-centred.">
        {firm.intro[0]}
      </PageHero>
      <section className="sec">
        <div className="wrap split">
          <div data-reveal>
            <h2>How we work</h2>
          </div>
          <div className="prose" data-reveal>
            <p>{firm.intro[1]}</p>
            <p>{firm.intro[2]}</p>
            <p>{firm.infrastructure}</p>
          </div>
        </div>
      </section>
      <section className="sec sec-alt">
        <div className="wrap trio">
          {[
            ['Vision', firm.vision],
            ['Mission', firm.mission],
            ['Guiding principle', firm.principle],
          ].map(([t, b]) => (
            <div key={t} className="panel" data-reveal>
              <h3>{t}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="sec">
        <div className="wrap founder">
          <div className="portrait" data-reveal>
            <span>[ Portrait of {founder.name} ]</span>
          </div>
          <div data-reveal>
            <p className="eyebrow dark">{founder.role}</p>
            <h2>{founder.name}</h2>
            <p className="cred">{founder.credential}</p>
            <div className="prose">
              {founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="wrap" data-reveal>
          <h3 className="sub">Areas of professional experience</h3>
          <ul className="chips">
            {founder.experience.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sec sec-alt">
        <div className="wrap split">
          <div data-reveal>
            <h2>Our team</h2>
          </div>
          <div className="prose" data-reveal>
            <p>
              RJA is supported by paralegals, legal secretaries, court clerks and administrative staff, and runs an internship programme where law students gain exposure to legal research, court processes and client service.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
