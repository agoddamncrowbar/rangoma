import { useEffect, useRef, useState } from 'react'

export function useRoute() {
  const read = () => window.location.hash.replace(/^#/, '') || '/'
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const on = () => {
      setRoute(read())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export function useAsync<T>(fn: () => Promise<T>, initial: T) {
  const [data, setData] = useState<T>(initial)
  useEffect(() => {
    fn().then(setData).catch(() => {})
  }, [])
  return data
}

export function useScrolled(px = 24) {
  const [s, setS] = useState(false)
  const ref = useRef(false)
  useEffect(() => {
    const on = () => {
      const v = window.scrollY > px
      if (v !== ref.current) {
        ref.current = v
        setS(v)
      }
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [px])
  return s
}
