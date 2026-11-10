import { getPosts } from '../lib/api'
import { useFetch } from '../lib/hooks'
import { Notice } from '../components/ui/Notice'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { PostGrid } from '../components/global/PostGrid'

export default function Insights() {
  const { data: posts, loading, error } = useFetch(getPosts)
  return (
    <>
      <PageHero eyebrow="Insights" title="Legal updates and guidance">
        Notes from our advocates on property, employment, succession and commercial disputes.
      </PageHero>
      <Section>
        <Container>
          {loading && <Notice>Loading articles</Notice>}
          {error && <Notice tone="error">We could not load the articles. Please try again shortly.</Notice>}
          {posts && posts.length === 0 && <Notice>No articles have been published yet.</Notice>}
          {posts && posts.length > 0 && <PostGrid posts={posts} />}
        </Container>
      </Section>
    </>
  )
}
