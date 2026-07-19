import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const el = glowRef.current
    if (!el) return

    let raf = 0
    let mx = -400, my = -400

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const render = () => {
      el.style.transform = `translate(${mx - 200}px, ${my - 200}px)`
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, rgba(168,85,247,0.03) 50%, transparent 70%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  )
}
