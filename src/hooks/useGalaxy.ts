import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

export function useGalaxy(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])
  const shootingRef = useRef<ShootingStar[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      const count = window.innerWidth < 768 ? 100 : 200
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
      }))
    }

    resize()
    init()

    const onResize = () => { resize(); init() }
    window.addEventListener('resize', onResize)

    const animate = () => {
      // Trail effect — same as original: rgba(2,6,23, 0.1)
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Stars in cyan — matching original exactly
      starsRef.current.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${star.opacity})`
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Twinkle
        star.opacity += (Math.random() - 0.5) * 0.1
        star.opacity = Math.max(0.1, Math.min(1, star.opacity))
      })

      // Shooting stars in purple — matching original
      if (Math.random() < 0.01) {
        shootingRef.current.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 5,
          opacity: 1,
        })
      }

      shootingRef.current = shootingRef.current.filter((star) => {
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x + star.length, star.y + star.length)
        ctx.strokeStyle = `rgba(168, 85, 247, ${star.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        star.x += star.speed
        star.y += star.speed
        star.opacity -= 0.01

        return star.opacity > 0 && star.x < canvas.width
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animRef.current)
      else animate()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [canvasRef])
}
