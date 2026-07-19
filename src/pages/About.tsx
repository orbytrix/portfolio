import { Link } from 'react-router-dom'
import PageHero from '@/components/PageHero'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { usePageTitle } from '@/hooks/usePageTitle'

const values = [
  { title: 'Innovation', desc: 'We constantly push boundaries to deliver groundbreaking solutions.', icon: '💡', color: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-600', glow: 'neon-glow' },
  { title: 'Collaboration', desc: 'We believe in the power of teamwork and open communication.', icon: '🤝', color: 'text-purple-400', gradient: 'from-purple-500 to-fuchsia-600', glow: 'neon-glow-purple' },
  { title: 'Excellence', desc: 'We are committed to delivering the highest quality in everything we create.', icon: '⭐', color: 'text-green-400', gradient: 'from-green-400 to-cyan-500', glow: 'neon-glow' },
  { title: 'Integrity', desc: 'We operate with transparency and ethical practices in all relationships.', icon: '🛡️', color: 'text-orange-400', gradient: 'from-orange-500 to-amber-600', glow: 'neon-glow-purple' },
]

const timeline = [
  { year: '2020', title: 'Founded', desc: 'OrbyTrix was founded by 3 developers with a vision to democratize AI for businesses of all sizes.', icon: '🚀' },
  { year: '2021', title: 'First 50 Clients', desc: 'We reached our first 50 clients and expanded our team to 15 professionals.', icon: '🎯' },
  { year: '2022', title: 'Mobile Expansion', desc: 'Launched our mobile app division, delivering iOS, Android, and Flutter apps.', icon: '📱' },
  { year: '2023', title: 'AI Platform Launch', desc: 'Released VoiceFlow — our flagship AI business assistant platform.', icon: '🤖' },
  { year: '2024', title: '500+ Projects', desc: 'Crossed 500 completed projects with a 98% client satisfaction rate and 50+ team members.', icon: '🏆' },
]

export default function About() {
  const pageRef = useScrollReveal()
  usePageTitle('About Us')

  return (
    <main id="main-content" ref={pageRef as React.RefObject<HTMLElement>}>
      <PageHero
        title="About OrbyTrix"
        subtitle="We're a team of passionate innovators dedicated to transforming businesses through AI-powered solutions and cutting-edge technology."
        breadcrumb="About Us"
      />

      {/* Our Story */}
      <section className="py-28 bg-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section label */}
          <div className="flex justify-center mb-4 reveal-on-scroll">
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              Our Story
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

            {/* Left — visual panel */}
            <div className="reveal-on-scroll order-2 lg:order-1">
              <div className="relative">
                {/* Main card */}
                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-800/40 backdrop-blur-sm p-8">
                  {/* Glowing top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />

                  <div className="flex items-center gap-4 mb-8">
                    <img src="/logo.jpg" alt="OrbyTrix" className="w-14 h-14 rounded-xl object-cover neon-glow" />
                    <div>
                      <h3 className="text-xl font-bold text-white">OrbyTrix</h3>
                      <p className="text-cyan-400 text-sm">Founded 2020 · Remote-First</p>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { val: '500+', label: 'Projects Delivered', icon: '🚀', color: 'border-cyan-500/20 bg-cyan-500/5' },
                      { val: '98%',  label: 'Client Satisfaction', icon: '⭐', color: 'border-purple-500/20 bg-purple-500/5' },
                      { val: '50+',  label: 'Team Members',        icon: '👥', color: 'border-purple-500/20 bg-purple-500/5' },
                      { val: '4+',   label: 'Years Experience',    icon: '📅', color: 'border-cyan-500/20 bg-cyan-500/5' },
                    ].map((s) => (
                      <div key={s.label} className={`rounded-xl border ${s.color} p-4 text-center`}>
                        <div className="text-2xl mb-1">{s.icon}</div>
                        <div className="text-2xl font-bold text-white">{s.val}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack strip */}
                  <div className="border-t border-slate-700/50 pt-6">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Core Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {['AI / ML', 'iOS', 'Android', 'Flutter', 'React', 'Node.js', 'Python', 'AWS'].map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-slate-700/60 border border-slate-600/50 text-gray-300 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge — founded year */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex flex-col items-center justify-center neon-glow shadow-xl">
                  <span className="text-white text-xl font-black leading-none">2020</span>
                  <span className="text-cyan-200 text-[9px] uppercase tracking-wider">Founded</span>
                </div>

                {/* Floating badge — global */}
                <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 flex items-center gap-2 shadow-xl">
                  <span className="text-xl">🌍</span>
                  <div>
                    <p className="text-white text-xs font-semibold">Global Clients</p>
                    <p className="text-gray-400 text-[10px]">25+ countries served</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — content */}
            <div className="reveal-on-scroll order-1 lg:order-2" style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="gradient-text">From 3 Developers</span>
                <br />
                <span className="text-white">to a Global Team</span>
              </h2>

              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>
                  Founded in 2020, OrbyTrix emerged from a simple yet powerful vision — to make advanced technology accessible to businesses of all sizes. What started as a small team of three developers has grown into a thriving company of <span className="text-cyan-400 font-semibold">50+ talented professionals</span> serving clients worldwide.
                </p>
                <p>
                  We noticed a critical gap in the market: small and medium-sized businesses were struggling to compete in an increasingly digital world, lacking access to the sophisticated AI tools and custom software that larger corporations enjoyed. <span className="text-white font-medium">We set out to change that.</span>
                </p>
                <p>
                  Today, we specialize in AI-powered assistants, mobile applications, and web platforms — always with a relentless focus on beautiful UI/UX design and measurable business outcomes.
                </p>
              </div>

              {/* Pull quote */}
              <div className="relative mt-8 pl-5 border-l-2 border-cyan-500">
                <p className="text-gray-300 italic text-lg leading-relaxed">
                  "We've helped businesses save thousands of hours through intelligent automation — but what we're most proud of is the lasting relationships we've built."
                </p>
                <p className="mt-3 text-cyan-400 text-sm font-semibold">— OrbyTrix Founding Team</p>
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl neon-glow hover:scale-105 transition-transform duration-300 text-sm"
                >
                  Work With Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 glass-card text-gray-300 hover:text-cyan-400 font-semibold rounded-xl transition-colors duration-300 text-sm"
                >
                  See Our Work
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <article className="glass-card p-8 hover-tilt reveal-on-scroll">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center neon-glow text-2xl">
                  ⚡
                </div>
                <h3 className="text-3xl font-bold ml-4 gradient-text">Our Mission</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To empower businesses with intelligent, time-saving technology solutions that drive growth and innovation. We believe every company deserves access to enterprise-level AI and software, regardless of size or budget.
              </p>
              <ul className="space-y-3 text-gray-400">
                {['Make AI accessible to all businesses', 'Deliver solutions that save time and money', 'Build lasting partnerships with our clients'].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-card p-8 hover-tilt reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-600 flex items-center justify-center neon-glow-purple text-2xl">
                  👁️
                </div>
                <h3 className="text-3xl font-bold ml-4 gradient-text">Our Vision</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To become the global leader in AI-powered business solutions, where every company has an intelligent assistant managing operations and technology seamlessly integrates with human creativity.
              </p>
              <ul className="space-y-3 text-gray-400">
                {['AI assistants for every business', 'Seamless human-AI collaboration', 'Global impact through innovation'].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((val, i) => (
              <div key={val.title} className="glass-card p-6 text-center hover-tilt reveal-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${val.gradient} flex items-center justify-center ${val.glow} text-2xl`}>
                  {val.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${val.color}`}>{val.title}</h3>
                <p className="text-gray-400">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">Milestones that shaped our story</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <div key={item.year} className="timeline-item reveal-on-scroll" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="flex items-start gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center neon-glow text-xl shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-cyan-400 font-bold mt-2">{item.year}</span>
                  </div>
                  <div className="glass-card p-6 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="md:hidden text-cyan-400 font-bold text-sm">{item.year}</span>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg-animated text-center">
        <div className="container mx-auto px-6 reveal-on-scroll">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-300 mb-8">Join 500+ businesses already growing with OrbyTrix.</p>
          <Link to="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg neon-glow hover:scale-105 transition-transform duration-300">
            Get In Touch →
          </Link>
        </div>
      </section>
    </main>
  )
}
