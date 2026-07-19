import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | OrbyTrix`
    return () => { document.title = 'OrbyTrix | AI-Powered Software Solutions' }
  }, [title])
}
