import { useEffect, useState } from 'react'
import type { ModuleKey } from '../routes'

export type View = 'landing' | 'deck' | ModuleKey

function parse(hash: string): View {
  const h = (hash || '').replace('#', '').trim()
  if (!h || h === '/') return 'landing'
  if (h === 'deck') return 'deck'
  return h as View
}

export function useRouter() {
  const [view, setView] = useState<View>(() => parse(window.location.hash))

  useEffect(() => {
    const onChange = () => setView(parse(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  function go(next: View) {
    const target = next === 'landing' ? '' : next
    const dest = target ? '#' + target : '#'
    if (window.location.hash !== dest) {
      window.location.hash = dest
    } else {
      setView(next)
    }
  }

  return { view, go }
}
