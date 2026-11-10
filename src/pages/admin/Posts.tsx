import { useState } from 'react'
import { api, type AdminPostRow } from '../../lib/api'
import { useFetch } from '../../lib/hooks'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Notice } from '../../components/ui/Notice'
import { AdminPage } from '../../components/layout/AdminPage'

function StatusBadge({ post }: { post: AdminPostRow }) {
  if (post.status === 'draft') return <Badge>Draft</Badge>
  if (post.scheduled) return <Badge tone="gold">Scheduled</Badge>
  return <Badge tone="green">Published</Badge>
}

export default function Posts() {
  const { data, loading, error, reload } = useFetch(() => api.get<{ posts: AdminPostRow[] }>('/api/admin/posts').then((r) => r.posts))
  const [confirming, setConfirming] = useState<number | null>(null)
  const [failure, setFailure] = useState('')

  async function remove(id: number) {
    setFailure('')
    try {
      await api.del(`/api/admin/posts/${id}`)
      setConfirming(null)
      reload()
    } catch (e) {
      setFailure((e as Error).message)
    }
  }

  return (
    <AdminPage
      title="Insights"
      intro="Articles shown on the website. Drafts stay hidden until you publish them."
      actions={
        <Button href="/admin/insights/new" variant="burg" size="sm">
          New insight
        </Button>
      }
    >
      {loading && <Notice>Loading</Notice>}
      {error && <Notice tone="error">{error.message}</Notice>}
      {failure && <Notice tone="error" className="mb-4">{failure}</Notice>}
      {data && data.length === 0 && <Notice>No insights yet. Use "New insight" to write the first one.</Notice>}
      {data && data.length > 0 && (
        <ul className="divide-y divide-ink/10 rounded-lg border border-ink/10 bg-card">
          {data.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4">
              {p.thumb ? (
                <img src={p.thumb} alt="" className="h-12 w-[77px] shrink-0 rounded-sm object-cover" />
              ) : (
                <div className="h-12 w-[77px] shrink-0 rounded-sm bg-raise" aria-hidden="true" />
              )}
              <div className="min-w-0 flex-1 basis-60">
                <a href={`/admin/insights/${p.id}`} className="block truncate font-medium text-ink hover:text-burg">
                  {p.title}
                </a>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[13px] text-mute">
                  <span>{p.tag}</span>
                  {p.date && <span className="tabular-nums">{p.date}</span>}
                  {!p.hasBody && <span>No article text yet</span>}
                </div>
              </div>
              <StatusBadge post={p} />
              <div className="flex items-center gap-4 text-sm">
                {p.status === 'published' && !p.scheduled && p.hasBody && (
                  <a href={`#/insights/${p.slug}`} className="text-mute underline decoration-1 underline-offset-4 hover:text-ink">
                    View
                  </a>
                )}
                <a href={`/admin/insights/${p.id}`} className="font-medium text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
                  Edit
                </a>
                {confirming === p.id ? (
                  <span className="flex items-center gap-3">
                    <button type="button" onClick={() => remove(p.id)} className="cursor-pointer font-medium text-[#a32a2a] underline underline-offset-4">
                      Delete for good
                    </button>
                    <button type="button" onClick={() => setConfirming(null)} className="cursor-pointer text-mute hover:text-ink">
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button type="button" onClick={() => setConfirming(p.id)} className="cursor-pointer text-mute hover:text-[#a32a2a]">
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  )
}
