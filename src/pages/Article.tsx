import { getPost, getPosts } from '../lib/api'
import { useFetch } from '../lib/hooks'
import { Notice } from '../components/ui/Notice'
import { TextLink } from '../components/ui/TextLink'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { ArticleBody } from '../components/global/ArticleBody'
import { Cta } from '../components/global/Cta'
import { PostGrid } from '../components/global/PostGrid'
import { Reveal } from '../components/global/Reveal'
import { SectionHead } from '../components/global/SectionHead'

export default function Article({ slug }: { slug: string }) {
  const { data: post, loading, error } = useFetch(() => getPost(slug), [slug])
  const { data: all } = useFetch(getPosts)

  if (loading)
    return (
      <PageHero eyebrow="Insights" title="Loading article">
        &nbsp;
      </PageHero>
    )
  if (error || !post)
    return (
      <PageHero eyebrow="Insights" title="Article not found">
        <TextLink href="#/insights" onDark>
          Back to all insights
        </TextLink>
      </PageHero>
    )

  const more = (all ?? []).filter((p) => p.slug !== slug).slice(0, 3)
  return (
    <>
      <PageHero eyebrow={post.tag} title={post.title}>
        {post.excerpt}
      </PageHero>
      <Section>
        <Container className="max-w-[720px]">
          <Reveal className="mb-10 flex flex-wrap gap-x-4 gap-y-1 border-b border-ink/10 pb-6 text-[13px] leading-4 tabular-nums text-mute">
            {post.date && <span>{post.date}</span>}
            {post.read && <span>{post.read}</span>}
            <span>Rongoma Janji &amp; Associates</span>
          </Reveal>
          <Reveal>
            {post.body ? <ArticleBody text={post.body} /> : <Notice>The full article is coming soon.</Notice>}
            <p className="mt-12 mb-5 rounded-lg bg-raise px-6 py-5 text-sm leading-[22px] text-ink-2">
              This article is general information and not legal advice. The right steps depend on the facts of your matter, so speak to an advocate before you act.
            </p>
            <TextLink href="#/insights">All insights</TextLink>
          </Reveal>
        </Container>
      </Section>
      {more.length > 0 && (
        <Section tone="raise">
          <Container>
            <SectionHead title="More insights" />
            <PostGrid posts={more} />
          </Container>
        </Section>
      )}
      <Cta />
    </>
  )
}
