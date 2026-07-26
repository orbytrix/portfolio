import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = Array.from(el.querySelectorAll<HTMLElement>('.reveal-on-scroll'))
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      // No negative rootMargin — elements already in view will trigger immediately
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    )

    targets.forEach((t) => {
      // If already visible in the viewport right now, reveal immediately
      const rect = t.getBoundingClientRect()
      const inView =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0

      if (inView) {
        t.classList.add('revealed')
      } else {
        observer.observe(t)
      }
    })

    return () => observer.disconnect()
  }, [])

  return ref
}
