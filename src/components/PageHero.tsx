import { Link } from 'react-router-dom'

interface PageHeroProps {
  title: string
  subtitle: string
  description?: string
  breadcrumb?: string
}

export default function PageHero({ title, subtitle, description, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg-animated opacity-60" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-cyan-400">{breadcrumb}</span>
            </div>
          </div>
        )}

        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              {breadcrumb ?? title}
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold gradient-text mb-6 leading-tight"
            style={{ animation: 'fadeInUp 0.6s ease forwards' }}
          >
            {title}
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
            style={{ animation: 'fadeInUp 0.6s ease 0.15s forwards', opacity: 0 }}
          >
            {subtitle}
          </p>
          {description && (
            <p
              className="text-lg text-gray-400 max-w-2xl mx-auto"
              style={{ animation: 'fadeInUp 0.6s ease 0.3s forwards', opacity: 0 }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  )
}
