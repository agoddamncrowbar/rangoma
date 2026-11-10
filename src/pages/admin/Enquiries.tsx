import { useState, type FormEvent } from 'react'
import { api, type Enquiry, type EnquiryPage, type EnquiryStatus } from '../../lib/api'
import { cx } from '../../lib/cx'
import { formatDateTime, timeAgo } from '../../lib/format'
import { useFetch } from '../../lib/hooks'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Notice } from '../../components/ui/Notice'
import { AdminPage } from '../../components/layout/AdminPage'

type Filter = 'all' | EnquiryStatus

const statusTone = { new: 'gold', read: 'grey', archived: 'grey' } as const
const statusLabel = { new: 'New', read: 'Read', archived: 'Archived' } as const

export default function Enquiries() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  // Kept apart from the list so the open message stays put when an action moves it out of the current filter.
  const [selected, setSelected] = useState<Enquiry | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [failure, setFailure] = useState('')

  const { data, loading, error, reload } = useFetch(
    () => api.get<EnquiryPage>(`/api/admin/enquiries?status=${filter}&q=${encodeURIComponent(search)}&page=${page}`),
    [filter, search, page],
  )

  const counts = data?.counts
  const tabs: [Filter, string, number | undefined][] = [
    ['all', 'Inbox', counts ? counts.new + counts.read : undefined],
    ['new', 'New', counts?.new],
    ['read', 'Read', counts?.read],
    ['archived', 'Archived', counts?.archived],
  ]

  async function setStatus(q: Enquiry, status: EnquiryStatus) {
    setFailure('')
    try {
      const { enquiry } = await api.patch<{ enquiry: Enquiry }>(`/api/admin/enquiries/${q.id}`, { status })
      setSelected(enquiry)
      reload()
    } catch (e) {
      setFailure((e as Error).message)
    }
  }

  async function open(q: Enquiry) {
    setSelected(q)
    setConfirmDelete(false)
    setFailure('')
    if (q.status === 'new') await setStatus(q, 'read')
  }

  async function remove(q: Enquiry) {
    setFailure('')
    try {
      await api.del(`/api/admin/enquiries/${q.id}`)
      setSelected(null)
      setConfirmDelete(false)
      reload()
    } catch (e) {
      setFailure((e as Error).message)
    }
  }

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    setPage(1)
    setSearch(query.trim())
  }

  return (
    <AdminPage title="Enquiries" intro="Messages sent through the contact form. Opening one marks it as read.">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Filter enquiries" className="flex flex-wrap gap-1">
          {tabs.map(([key, label, n]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => {
                setFilter(key)
                setPage(1)
              }}
              className={cx(
                'cursor-pointer rounded-xs px-3 py-1.5 text-sm transition-colors duration-150 ease-soft',
                filter === key ? 'bg-burg text-[#f6f0e4]' : 'text-ink-2 hover:bg-raise',
              )}
            >
              {label}
              {n !== undefined && <span className={cx('ml-2 tabular-nums', filter === key ? 'text-[#f6f0e4]/75' : 'text-mute')}>{n}</span>}
            </button>
          ))}
        </div>
        <form onSubmit={submitSearch} role="search" className="flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email or message"
            aria-label="Search enquiries"
            className="h-9 w-64 rounded-xs border border-ink/20 bg-card px-3 text-sm focus:border-burg focus:outline-2 focus:outline-burg focus:outline-offset-0"
          />
          <Button type="submit" variant="burg" size="sm">
            Search
          </Button>
        </form>
      </div>

      {error && <Notice tone="error" className="mb-4">{error.message}</Notice>}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
        <section aria-label="Enquiries" className="rounded-lg border border-ink/10 bg-card">
          {loading && !data && <p className="m-0 p-5 text-sm text-mute">Loading</p>}
          {data && data.items.length === 0 && <p className="m-0 p-5 text-sm text-mute">{search ? 'No enquiries match your search.' : 'No enquiries here yet.'}</p>}
          {data && data.items.length > 0 && (
            <ul className="divide-y divide-ink/10">
              {data.items.map((q) => (
                <li key={q.id}>
                  <button
                    type="button"
                    onClick={() => open(q)}
                    aria-current={selected?.id === q.id}
                    className={cx(
                      'grid w-full cursor-pointer grid-cols-[10px_1fr_auto] items-start gap-3 px-5 py-4 text-left transition-colors duration-150 ease-soft hover:bg-raise/60',
                      selected?.id === q.id && 'bg-raise',
                    )}
                  >
                    <span className={cx('mt-2 size-2 rounded-full', q.status === 'new' ? 'bg-gold-ink' : 'bg-transparent')} aria-label={q.status === 'new' ? 'New' : undefined} />
                    <span className="min-w-0">
                      <span className={cx('block truncate', q.status === 'new' ? 'font-medium text-ink' : 'text-ink-2')}>{q.name}</span>
                      <span className="block truncate text-[13px] leading-5 text-mute">{q.area ? `${q.area}: ` : ''}{q.message}</span>
                    </span>
                    <span className="text-[13px] leading-5 whitespace-nowrap text-mute tabular-nums">{timeAgo(q.createdAt)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {data && data.pages > 1 && (
            <div className="flex items-center justify-between border-t border-ink/10 px-5 py-3 text-sm text-ink-2">
              <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="cursor-pointer disabled:cursor-default disabled:opacity-40">
                Previous
              </button>
              <span className="tabular-nums">
                Page {data.page} of {data.pages}
              </span>
              <button type="button" disabled={page >= data.pages} onClick={() => setPage(page + 1)} className="cursor-pointer disabled:cursor-default disabled:opacity-40">
                Next
              </button>
            </div>
          )}
        </section>

        <section aria-label="Message" className="rounded-lg border border-ink/10 bg-card p-6 lg:sticky lg:top-8">
          {!selected ? (
            <p className="m-0 text-[15px] text-mute">Select an enquiry to read it.</p>
          ) : (
            <div className="grid gap-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="m-0 font-serif text-[28px] leading-[1.1] font-medium">{selected.name}</h2>
                <Badge tone={statusTone[selected.status]}>{statusLabel[selected.status]}</Badge>
              </div>
              {failure && <Notice tone="error">{failure}</Notice>}

              <dl className="m-0 grid grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-[15px]">
                <dt className="text-mute">Email</dt>
                <dd className="m-0 break-all">
                  <a href={`mailto:${selected.email}`} className="text-burg underline decoration-burg/35 underline-offset-4 hover:decoration-burg">
                    {selected.email}
                  </a>
                </dd>
                <dt className="text-mute">Phone</dt>
                <dd className="m-0">
                  {selected.phone ? (
                    <a href={`tel:${selected.phone.replace(/[^+\d]/g, '')}`} className="text-burg underline decoration-burg/35 underline-offset-4 hover:decoration-burg">
                      {selected.phone}
                    </a>
                  ) : (
                    <span className="text-mute">Not given</span>
                  )}
                </dd>
                <dt className="text-mute">Area of law</dt>
                <dd className="m-0">{selected.area ?? <span className="text-mute">Not given</span>}</dd>
                <dt className="text-mute">Received</dt>
                <dd className="m-0 tabular-nums">{formatDateTime(selected.createdAt)}</dd>
                <dt className="text-mute">Confirmation</dt>
                <dd className="m-0">
                  {selected.replySentAt ? (
                    <span className="tabular-nums">Emailed {formatDateTime(selected.replySentAt)}</span>
                  ) : selected.replyError ? (
                    <span className="text-[#a32a2a]">Not sent: {selected.replyError}</span>
                  ) : (
                    <span className="text-mute">Not sent</span>
                  )}
                </dd>
              </dl>

              <div>
                <div className="mb-2 text-[13px] text-mute">Message</div>
                <div className="rounded-lg bg-page p-4 text-[15px] leading-6 whitespace-pre-wrap">{selected.message}</div>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/10 pt-5 text-sm">
                <Button
                  href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: your enquiry to Rongoma Janji & Associates')}&body=${encodeURIComponent(`Dear ${selected.name.split(' ')[0]},\n\n`)}`}
                  variant="burg"
                  size="sm"
                >
                  Reply by email
                </Button>
                {selected.status !== 'archived' && (
                  <button type="button" onClick={() => setStatus(selected, selected.status === 'new' ? 'read' : 'new')} className="cursor-pointer text-ink-2 underline underline-offset-4 hover:text-ink">
                    {selected.status === 'new' ? 'Mark as read' : 'Mark as unread'}
                  </button>
                )}
                <button type="button" onClick={() => setStatus(selected, selected.status === 'archived' ? 'read' : 'archived')} className="cursor-pointer text-ink-2 underline underline-offset-4 hover:text-ink">
                  {selected.status === 'archived' ? 'Restore to inbox' : 'Archive'}
                </button>
                {confirmDelete ? (
                  <span className="flex items-center gap-3">
                    <button type="button" onClick={() => remove(selected)} className="cursor-pointer font-medium text-[#a32a2a] underline underline-offset-4">
                      Delete for good
                    </button>
                    <button type="button" onClick={() => setConfirmDelete(false)} className="cursor-pointer text-mute hover:text-ink">
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button type="button" onClick={() => setConfirmDelete(true)} className="cursor-pointer text-mute hover:text-[#a32a2a]">
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </AdminPage>
  )
}
