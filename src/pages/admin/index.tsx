import { useEffect } from 'react'
import { useAuth } from '../../lib/auth'
import { navigate } from '../../lib/nav'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { Notice } from '../../components/ui/Notice'
import Account from './Account'
import Dashboard from './Dashboard'
import Enquiries from './Enquiries'
import Forgot from './Forgot'
import Login from './Login'
import PostEditor from './PostEditor'
import Posts from './Posts'
import Reset from './Reset'

function Screen({ route }: { route: string }) {
  if (route === '/admin/insights') return <Posts />
  if (route === '/admin/insights/new') return <PostEditor key="new" id={null} />
  const edit = route.match(/^\/admin\/insights\/(\d+)$/)
  if (edit) return <PostEditor key={edit[1]} id={Number(edit[1])} />
  if (route === '/admin/enquiries') return <Enquiries />
  if (route === '/admin/account') return <Account />
  return <Dashboard />
}

// Everything under /admin. Signed-out visitors are sent to the sign-in page.
export default function AdminRoutes({ route }: { route: string }) {
  const { user, loading } = useAuth()
  const onLogin = route === '/admin/login'
  const open = onLogin || route === '/admin/forgot' || route === '/admin/reset'

  // Links to /admin/... change the page without a full reload.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element).closest('a')
      const href = a?.getAttribute('href')
      if (!a || !href || a.target || !(href === '/admin' || href.startsWith('/admin/'))) return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (loading) return
    if (!user && !open) navigate('/admin/login', true)
    if (user && onLogin) navigate('/admin', true)
  }, [user, loading, open, onLogin])

  if (loading) return <div className="grid min-h-screen place-items-center"><Notice>Loading</Notice></div>
  if (route === '/admin/forgot') return <Forgot />
  if (route === '/admin/reset') return <Reset />
  if (!user) return onLogin ? <Login /> : null
  if (onLogin) return null
  return (
    <AdminLayout route={route}>
      <Screen route={route} />
    </AdminLayout>
  )
}
