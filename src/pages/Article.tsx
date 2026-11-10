import { getPost, insights } from '../data/insights'
import { getInsights } from '../lib/wp'
import { useAsync } from '../lib/hooks'
import { Heading } from '../components/ui/Heading'
import { TextLink } from '../components/ui/TextLink'
import { Container } from '../components/layout/Container'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/layout/Section'
import { Cta } from '../components/global/Cta'
import { PostGrid } from '../components/global/PostGrid'
import { Reveal } from '../components/global/Reveal'
import { SectionHead } from '../components/global/SectionHead'

export default function Article({ slug }: { slug: string }) {
  const posts = useAsync(getInsights, insights)
  const post = getPost(posts, slug)
  if (!post || !post.body)
    return (
      <PageHero eyebrow="Insights" title="Article not found">
        <TextLink href="#/insights" onDark>
          Back to all insights
        </TextLink>
      </PageHero>
    )
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3)
  return (
    <>
      <PageHero eyebrow={post.tag} title={post.title}>
        {post.excerpt}
      </PageHero>
      <Section>
        <Container className="max-w-[720px]">
          <Reveal className="mb-10 flex flex-wrap gap-x-4 gap-y-1 border-b border-ink/10 pb-6 text-[13px] leading-4 tabular-nums text-mute">
            <span>{post.date}</span>
            {post.read && <span>{post.read}</span>}
            <span>Rongoma Janji &amp; Associates</span>
          </Reveal>
          <Reveal className="[&_p]:mb-5 [&_p]:text-lg [&_p]:leading-[30px] [&_p]:text-ink-2">
            {post.body.map((b, i) => (
              <div key={i}>
                {b.h && (
                  <Heading as="h3" size="lg" className="mt-10 mb-3 text-[28px] [font-variant-numeric:lining-nums]">
                    {b.h}
                  </Heading>
                )}
                {b.p.map((t, j) => (
                  <p key={t} className={i === 0 && j === 0 ? 'font-serif !text-[22px] !leading-8 font-medium !text-burg' : undefined}>
                    {t}
                  </p>
                ))}
              </div>
            ))}
            <p className="mt-12 rounded-lg bg-raise px-6 py-5 !text-sm !leading-[22px]">
              This article is general information and not legal advice. The right steps depend on the facts of your matter, so speak to an advocate before you act.
            </p>
            <TextLink href="#/insights">All insights</TextLink>
          </Reveal>
        </Container>
      </Section>
      <Section tone="raise">
        <Container>
          <SectionHead title="More insights" />
          <PostGrid posts={more} />
        </Container>
      </Section>
      <Cta />
    </>
  )
}
