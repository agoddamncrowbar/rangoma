import { insights } from '../data/insights'
import { getInsights } from '../lib/wp'
import { useAsync } from '../lib/hooks'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { PostGrid } from '../components/global/PostGrid'

export default function Insights() {
  const posts = useAsync(getInsights, insights)
  return (
    <>
      <PageHero eyebrow="Insights" title="Legal updates and guidance">
        Notes from our advocates on property, employment, succession and commercial disputes.
      </PageHero>
      <Section>
        <Container>
          <PostGrid posts={posts} />
        </Container>
      </Section>
    </>
  )
}
