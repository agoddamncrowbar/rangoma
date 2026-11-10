import { useEffect } from 'react'
import { useRoute } from '../lib/hooks'
import { Footer, Header } from './AltLayout'
import { AltAbout, AltArticle, AltContact, AltHome, AltInsights, AltPracticeDetail, AltPracticeList } from './AltPages'
import './alt.css'

// Adds .in to [data-a] elements as they scroll into view.
function useFade(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll('.alt [data-a]:not(.in)')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

export default function AltApp() {
  const route = useRoute()
  useFade(route)
  let page
  if (route === '/about') page = <AltAbout />
  else if (route === '/practice') page = <AltPracticeList />
  else if (route.startsWith('/practice/')) page = <AltPracticeDetail slug={route.slice(10)} />
  else if (route === '/insights') page = <AltInsights />
  else if (route.startsWith('/insights/')) page = <AltArticle slug={route.slice(10)} />
  else if (route === '/contact') page = <AltContact />
  else page = <AltHome />
  return (
    <div className="alt">
      <Header route={route} />
      <main key={route}>{page}</main>
      <Footer />
    </div>
  )
}
