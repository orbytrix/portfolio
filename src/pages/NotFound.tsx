import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useGalaxy } from '@/hooks/useGalaxy'

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useGalaxy(canvasRef)

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-slate-950/70" />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Glowing 404 */}
        <div className="text-[10rem] md:text-[14rem] font-black leading-none gradient-text select-none" style={{ filter: 'drop-shadow(0 0 40px rgba(6,182,212,0.4))' }}>
          404
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 -mt-6">Page Not Found</h1>
        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
          Looks like this page drifted into deep space. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl neon-glow hover:scale-105 transition-transform duration-300"
          >
            ← Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 glass-card text-gray-300 hover:text-cyan-400 font-semibold rounded-xl transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}
