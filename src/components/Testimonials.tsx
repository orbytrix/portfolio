import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechVentures',
    avatar: 'SM',
    color: 'from-cyan-500 to-blue-600',
    text: 'OrbyTrix built our AI assistant in just 6 weeks. It now handles 80% of our daily operations — scheduling, reporting, and client follow-ups. Incredible team.',
    rating: 5,
  },
  {
    name: 'James Patel',
    role: 'Founder, ShopEase',
    avatar: 'JP',
    color: 'from-purple-500 to-fuchsia-600',
    text: 'The Flutter app they delivered exceeded every expectation. Downloads hit 50K in the first month. Clean code, beautiful UI, and delivered on time.',
    rating: 5,
  },
  {
    name: 'Anika Reeves',
    role: 'CTO, MediCare Pro',
    avatar: 'AR',
    color: 'from-green-500 to-cyan-500',
    text: 'We needed a HIPAA-compliant healthcare platform fast. OrbyTrix delivered a full-featured system in 10 weeks with zero security issues. Truly impressive.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Director, PropFinder',
    avatar: 'MC',
    color: 'from-orange-500 to-amber-600',
    text: 'Real estate is a tough space for tech. OrbyTrix understood our domain perfectly and built a platform our agents actually love using. 10/10 would recommend.',
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setActive((a) => (a + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next])

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mt-4 mb-4">What Clients Say</h2>
          <p className="text-xl text-gray-400">Real feedback from businesses we've transformed</p>
        </div>

        {/* Carousel */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Active card */}
          <div className="relative">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="glass-card p-8 md:p-10 transition-all duration-500"
                style={{
                  display: i === active ? 'block' : 'none',
                }}
              >
                {/* Quote icon */}
                <svg className="w-10 h-10 text-cyan-500/40 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-gray-200 text-lg leading-relaxed mb-8">"{t.text}"</p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t.name}</p>
                      <p className="text-gray-400 text-sm">{t.role}</p>
                    </div>
                  </div>
                  <Stars count={t.rating} />
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Prev button */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-slate-600 hover:border-cyan-500 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    active === i
                      ? 'w-7 h-2.5 bg-cyan-400'
                      : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-slate-600 hover:border-cyan-500 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Preview thumbnails */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`glass-card p-3 text-left transition-all duration-300 ${
                  active === i
                    ? 'border-cyan-500/50 bg-slate-800/60'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold mb-2`}>
                  {t.avatar}
                </div>
                <p className="text-white text-xs font-semibold truncate">{t.name.split(' ')[0]}</p>
                <p className="text-gray-500 text-xs truncate">{t.role.split(',')[0]}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
