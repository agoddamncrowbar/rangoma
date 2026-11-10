import { useEffect } from 'react'
import { AuthProvider } from './components/global/AuthProvider'
import { Layout } from './components/layout/Layout'
import { useRoute } from './lib/hooks'
import { isAdminPath, navigate, usePath } from './lib/nav'
import About from './pages/About'
import AdminRoutes from './pages/admin'
import Article from './pages/Article'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Insights from './pages/Insights'
import Practice from './pages/Practice'
import PracticeDetail from './pages/PracticeDetail'

function Page({ route }: { route: string }) {
  if (route === '/about') return <About />
  if (route === '/practice') return <Practice />
  if (route.startsWith('/practice/')) return <PracticeDetail slug={route.slice('/practice/'.length)} />
  if (route === '/insights') return <Insights />
  if (route.startsWith('/insights/')) return <Article slug={route.slice('/insights/'.length)} />
  if (route === '/contact') return <Contact />
  return <Home />
}

export default function App() {
  const route = useRoute()
  const path = usePath()

  // Old bookmarks like /#/admin/enquiries now live at /admin/enquiries.
  useEffect(() => {
    if (route === '/admin' || route.startsWith('/admin/')) navigate(route, true)
  }, [route])

  // The admin portal has its own layout and sign-in; everything else is the public site.
  if (isAdminPath(path)) {
    return (
      <AuthProvider>
        <AdminRoutes route={path} />
      </AuthProvider>
    )
  }
  return (
    <Layout route={route}>
      <Page route={route} />
    </Layout>
  )
}
