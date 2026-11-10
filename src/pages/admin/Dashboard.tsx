import { api, type Stats } from '../../lib/api'
import { formatDateTime } from '../../lib/format'
import { useFetch } from '../../lib/hooks'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Heading } from '../../components/ui/Heading'
import { Notice } from '../../components/ui/Notice'
import { TextLink } from '../../components/ui/TextLink'
import { AdminPage } from '../../components/layout/AdminPage'

function Stat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <a href={href} className="group rounded-lg border border-ink/10 bg-card p-5 transition-colors duration-150 ease-soft hover:border-ink/30">
      <div className="text-[13px] leading-4 text-mute">{label}</div>
      <div className="mt-3 font-serif text-[40px] leading-none font-medium text-burg [font-variant-numeric:lining-nums_tabular-nums]">{value}</div>
    </a>
  )
}

export default function Dashboard() {
  const { data, loading, error } = useFetch(() => api.get<Stats>('/api/admin/stats'))
  return (
    <AdminPage
      title="Dashboard"
      actions={
        <Button href="/admin/insights/new" variant="burg" size="sm">
          New insight
        </Button>
      }
    >
      {loading && <Notice>Loading</Notice>}
      {error && <Notice tone="error">{error.message}</Notice>}
      {data && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Stat label="New enquiries" value={data.newEnquiries} href="/admin/enquiries" />
            <Stat label="Enquiries in inbox" value={data.totalEnquiries} href="/admin/enquiries" />
            <Stat label="Published insights" value={data.publishedPosts} href="/admin/insights" />
            <Stat label="Drafts" value={data.draftPosts} href="/admin/insights" />
          </div>

          <div className="mt-10 mb-4 flex items-end justify-between">
            <Heading as="h2" size="md">
              Latest enquiries
            </Heading>
            <TextLink href="/admin/enquiries">Open inbox</TextLink>
          </div>
          {data.recent.length === 0 ? (
            <Notice>No enquiries yet. They appear here when someone uses the contact form.</Notice>
          ) : (
            <ul className="divide-y divide-ink/10 rounded-lg border border-ink/10 bg-card">
              {data.recent.map((q) => (
                <li key={q.id}>
                  <a href="/admin/enquiries" className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-4 transition-colors hover:bg-raise/60">
                    <span className="flex items-center gap-3">
                      <span className="font-medium">{q.name}</span>
                      {q.status === 'new' && <Badge tone="gold">New</Badge>}
                      {q.area && <span className="text-sm text-mute">{q.area}</span>}
                    </span>
                    <span className="text-[13px] tabular-nums text-mute">{formatDateTime(q.createdAt)}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </AdminPage>
  )
}
