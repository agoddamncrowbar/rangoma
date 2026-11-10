import { Heading } from '../ui/Heading'

// Renders the editor's simple format as text, never as HTML:
// "## Heading" lines become headings; blank lines separate paragraphs.
export function ArticleBody({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/).filter(Boolean)
  return (
    <div className="[&_p]:mb-5 [&_p]:text-lg [&_p]:leading-[30px] [&_p]:whitespace-pre-line [&_p]:text-ink-2">
      {blocks.map((block, i) =>
        block.startsWith('## ') ? (
          <Heading key={i} as="h3" size="lg" className="mt-10 mb-3 text-[28px] [font-variant-numeric:lining-nums]">
            {block.slice(3).trim()}
          </Heading>
        ) : (
          <p key={i} className={i === 0 ? 'font-serif !text-[22px] !leading-8 font-medium !text-burg' : undefined}>
            {block}
          </p>
        ),
      )}
    </div>
  )
}
