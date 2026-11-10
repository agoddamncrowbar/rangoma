import { Layout } from './components/layout/Layout'
import { useRoute } from './lib/hooks'
import About from './pages/About'
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
  return (
    <Layout route={route}>
      <Page route={route} />
    </Layout>
  )
}
