import type { ReactNode } from 'react'
import { api, type Stats } from '../../lib/api'
import { useAuth } from '../../lib/auth'
import { cx } from '../../lib/cx'
import { useFetch } from '../../lib/hooks'
import logoLight from '../../assets/logo-light.png'

const links = [
  ['/admin', 'Dashboard'],
  ['/admin/insights', 'Insights'],
  ['/admin/enquiries', 'Enquiries'],
  ['/admin/account', 'Account'],
] as const

export function AdminLayout({ route, children }: { route: string; children: ReactNode }) {
  const { user, logout } = useAuth()
  // Refetched on every page change so the unread count stays current.
  const { data: stats } = useFetch(() => api.get<Stats>('/api/admin/stats'), [route])
  const active = (p: string) => (p === '/admin' ? route === '/admin' : route.startsWith(p))

  return (
    <div className="min-h-screen lg:flex">
      <aside data-dark className="flex flex-col gap-6 bg-night px-6 py-5 text-on lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:py-8">
        <a href="/admin" className="flex items-center gap-3 font-serif text-lg leading-[1.1] font-medium">
          <img src={logoLight} alt="" className="h-9 w-auto" />
          <span>
            Rongoma Janji
            <small className="block font-sans text-xs leading-4 font-normal text-gold">Admin portal</small>
          </span>
        </a>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col">
          {links.map(([p, l]) => (
            <a
              key={p}
              href={p}
              className={cx(
                'flex items-center justify-between gap-3 rounded-xs px-3 py-2 text-[15px] whitespace-nowrap transition-colors duration-150 ease-soft',
                active(p) ? 'bg-on/10 text-on' : 'text-on/75 hover:bg-on/5 hover:text-on',
              )}
            >
              {l}
              {p === '/admin/enquiries' && stats && stats.newEnquiries > 0 && (
                <span className="rounded-xs bg-gold px-2 py-0.5 text-xs leading-5 font-medium text-night tabular-nums">{stats.newEnquiries}</span>
              )}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-on/15 pt-5 text-sm">
          <a href="/" className="text-on/75 transition-colors hover:text-on">
            View website
          </a>
          <div className="text-on/75">
            <div className="truncate font-medium text-on">{user?.name}</div>
            <div className="truncate text-[13px]">{user?.username ?? user?.email}</div>
          </div>
          <button type="button" onClick={logout} className="cursor-pointer text-left text-gold underline decoration-gold/40 decoration-1 underline-offset-4 hover:decoration-gold">
            Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-6 py-8 lg:px-12 lg:py-12">{children}</main>
    </div>
  )
}
