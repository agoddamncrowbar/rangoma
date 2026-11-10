import { useEffect, useRef, useState, type FormEvent } from 'react'
import { navigate } from '../../lib/nav'
import { api, ApiError, type AdminPost, type PostInput } from '../../lib/api'
import { Button } from '../../components/ui/Button'
import { Input, Select, Textarea } from '../../components/ui/Field'
import { Heading } from '../../components/ui/Heading'
import { Notice } from '../../components/ui/Notice'
import { AdminPage } from '../../components/layout/AdminPage'
import { ArticleBody } from '../../components/global/ArticleBody'

const blank: PostInput = { title: '', tag: '', excerpt: '', body: '', thumb: null, status: 'draft', publishedAt: null }
const topics = ['Property', 'Employment', 'Succession', 'Litigation', 'Banking', 'Criminal', 'Corporate', 'Land', 'Insurance', 'Election']

export default function PostEditor({ id }: { id: number | null }) {
  const [form, setForm] = useState<PostInput>(blank)
  const [loading, setLoading] = useState(id !== null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (id === null) return
    api
      .get<{ post: AdminPost }>(`/api/admin/posts/${id}`)
      .then(({ post }) => setForm({ title: post.title, tag: post.tag, excerpt: post.excerpt, body: post.body, thumb: post.thumb, status: post.status, publishedAt: post.publishedAt }))
      .catch((e: Error) => setMessage({ tone: 'error', text: e.message }))
      .finally(() => setLoading(false))
  }, [id])

  const set = <K extends keyof PostInput>(key: K, value: PostInput[K]) => setForm((f) => ({ ...f, [key]: value }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    setMessage(null)
    try {
      const payload = { ...form, publishedAt: form.publishedAt || null }
      const res = id === null ? await api.post<{ post: AdminPost }>('/api/admin/posts', payload) : await api.put<{ post: AdminPost }>(`/api/admin/posts/${id}`, payload)
      setForm((f) => ({ ...f, publishedAt: res.post.publishedAt }))
      setMessage({ tone: 'success', text: res.post.status === 'published' ? 'Saved and published.' : 'Draft saved.' })
      if (id === null) navigate(`/admin/insights/${res.post.id}`, true)
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fields)
        setMessage({ tone: 'error', text: err.message })
      } else {
        setMessage({ tone: 'error', text: 'Something went wrong. Please try again.' })
      }
    } finally {
      setSaving(false)
    }
  }

  async function upload(file: File | undefined) {
    if (!file) return
    setUploading(true)
    setErrors((er) => ({ ...er, thumb: '' }))
    try {
      const { path } = await api.upload(file)
      set('thumb', path)
    } catch (err) {
      setErrors((er) => ({ ...er, thumb: (err as Error).message }))
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  if (loading) {
    return (
      <AdminPage title="Edit insight">
        <Notice>Loading</Notice>
      </AdminPage>
    )
  }

  return (
    <AdminPage
      title={id === null ? 'New insight' : 'Edit insight'}
      actions={
        <a href="/admin/insights" className="text-sm font-medium text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
          Back to insights
        </a>
      }
    >
      <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="grid gap-5">
          {message && <Notice tone={message.tone}>{message.text}</Notice>}
          <Input label="Title" value={form.title} onChange={(e) => set('title', e.target.value)} error={errors.title} required maxLength={160} />
          <div className="grid items-start gap-5 sm:grid-cols-[200px_1fr]">
            <Input label="Topic" list="topics" value={form.tag} onChange={(e) => set('tag', e.target.value)} error={errors.tag} required maxLength={40} hint="Shown above the title." />
            <datalist id="topics">
              {topics.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
            <Textarea label="Summary" rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} error={errors.excerpt} required maxLength={400} hint={`${form.excerpt.length}/400. Shown on the cards and under the title.`} />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm leading-5 font-medium text-ink">Article text</span>
              <button type="button" onClick={() => setPreview(!preview)} className="cursor-pointer text-sm font-medium text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
                {preview ? 'Back to editing' : 'Preview'}
              </button>
            </div>
            {preview ? (
              <div className="min-h-[24rem] rounded-xs border border-ink/20 bg-card p-6">{form.body.trim() ? <ArticleBody text={form.body} /> : <p className="text-mute">Nothing to preview yet.</p>}</div>
            ) : (
              <Textarea
                label=""
                aria-label="Article text"
                rows={22}
                value={form.body}
                onChange={(e) => set('body', e.target.value)}
                error={errors.body}
                hint={
                  <>
                    Leave a blank line between paragraphs. Start a line with <code className="rounded-xs bg-raise px-1">## </code> for a heading. The first paragraph is shown larger as an introduction.
                  </>
                }
                className="[&>textarea]:leading-7"
              />
            )}
          </div>
        </div>

        <aside className="grid gap-5 rounded-lg border border-ink/10 bg-card p-5 lg:sticky lg:top-8">
          <Heading as="h2" size="sm">
            Publishing
          </Heading>
          <Select label="Status" value={form.status} onChange={(e) => set('status', e.target.value as PostInput['status'])} error={errors.status}>
            <option value="draft">Draft (hidden)</option>
            <option value="published">Published</option>
          </Select>
          <Input
            label="Publish date"
            type="date"
            value={form.publishedAt ?? ''}
            onChange={(e) => set('publishedAt', e.target.value || null)}
            error={errors.publishedAt}
            hint="Leave empty to publish today. A future date schedules it."
          />

          <div className="grid gap-2">
            <span className="text-sm leading-5 font-medium text-ink">Thumbnail</span>
            {form.thumb ? <img src={form.thumb} alt="" className="aspect-[16/10] w-full rounded-lg object-cover" /> : <div className="grid aspect-[16/10] place-items-center rounded-lg bg-raise text-[13px] text-mute">No image</div>}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" id="thumb-input" onChange={(e) => upload(e.target.files?.[0])} />
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label htmlFor="thumb-input" className="cursor-pointer font-medium text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
                {uploading ? 'Uploading' : form.thumb ? 'Replace image' : 'Upload image'}
              </label>
              {form.thumb && (
                <button type="button" onClick={() => set('thumb', null)} className="cursor-pointer text-mute hover:text-[#a32a2a]">
                  Remove
                </button>
              )}
            </div>
            <span className="text-[13px] leading-5 text-mute">JPG, PNG or WebP, up to 4 MB. A wide image about 1600 by 1000 works best.</span>
            {errors.thumb && <span className="text-[13px] leading-5 text-[#a32a2a]">{errors.thumb}</span>}
          </div>

          <Button type="submit" variant="burg">
            {saving ? 'Saving' : form.status === 'published' ? 'Save and publish' : 'Save draft'}
          </Button>
        </aside>
      </form>
    </AdminPage>
  )
}
