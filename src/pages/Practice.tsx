import { practiceAreas } from '../data/content'
import { getPracticeAreas } from '../lib/wp'
import { useAsync } from '../lib/hooks'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { Cta } from '../components/global/Cta'
import { PracticeList } from '../components/global/PracticeList'

export default function Practice() {
  const areas = useAsync(getPracticeAreas, practiceAreas)
  return (
    <>
      <PageHero eyebrow="Practice areas" title="Litigation-led, with depth across property, finance and succession">
        Our advocates act for businesses, institutions and individuals, from property and corporate work to litigation and probate.
      </PageHero>
      <Section>
        <Container className="max-w-[960px]">
          <PracticeList areas={areas} />
        </Container>
      </Section>
      <Cta />
    </>
  )
}
