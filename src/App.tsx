import { Footer, Header } from './components/Layout'
import { useReveal, useRoute } from './lib/hooks'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Insights from './pages/Insights'
import { PracticeDetail, PracticeList } from './pages/Practice'

export default function App() {
  const route = useRoute()
  useReveal(route)
  let page
  if (route === '/about') page = <About />
  else if (route === '/practice') page = <PracticeList />
  else if (route.startsWith('/practice/')) page = <PracticeDetail slug={route.slice(10)} />
  else if (route === '/insights') page = <Insights />
  else if (route === '/contact') page = <Contact />
  else page = <Home />
  return (
    <>
      <Header route={route} />
      <main key={route}>{page}</main>
      <Footer />
    </>
  )
}
