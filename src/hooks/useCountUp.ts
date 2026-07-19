import { useState, useEffect, useRef } from 'react'

// Parses "500+", "98%", "50+", "24/7" into a numeric target + suffix
function parse(val: string): { target: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/)
  if (!match) return { target: 0, suffix: val }
  return { target: parseInt(match[1], 10), suffix: match[2] }
}

export function useCountUp(value: string, duration = 1800) {
  const { target, suffix } = parse(value)
  const [display, setDisplay] = useState('0')
  const hasRun = useRef(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const start = performance.now()

          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * target)
            setDisplay(`${current}${suffix}`)
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])

  return { display, ref }
}
