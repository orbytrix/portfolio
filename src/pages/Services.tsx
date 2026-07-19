import { Link } from 'react-router-dom'
import PageHero from '@/components/PageHero'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { usePageTitle } from '@/hooks/usePageTitle'

const services = [
  {
    title: 'AI-Powered Solutions',
    desc: 'Build intelligent AI assistants like Siri that understand, learn, and manage your business operations autonomously.',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'neon-glow',
    icon: '🤖',
    delivery: '6–10 weeks',
    features: ['Voice-activated AI assistants', 'Machine learning models', 'Natural language processing', 'Predictive analytics', 'Computer vision solutions'],
  },
  {
    title: 'iOS App Development',
    desc: 'Native iOS applications built with Swift and SwiftUI for exceptional performance and user experience.',
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-fuchsia-600',
    glow: 'neon-glow-purple',
    icon: '🍎',
    delivery: '4–8 weeks',
    features: ['Native Swift development', 'SwiftUI modern interfaces', 'Apple Watch & iPad apps', 'App Store optimization', 'CoreML & HealthKit integration'],
  },
  {
    title: 'Android App Development',
    desc: 'High-performance Android applications using Kotlin and modern Android architecture components.',
    color: 'text-green-400',
    gradient: 'from-green-500 to-emerald-600',
    glow: 'neon-glow',
    icon: '🤖',
    delivery: '4–8 weeks',
    features: ['Native Kotlin development', 'Jetpack Compose UI', 'Wear OS & Tablet support', 'Google Play optimization', 'ML Kit & Firebase integration'],
  },
  {
    title: 'Flutter Cross-Platform',
    desc: 'Build beautiful apps for iOS, Android, and web from a single codebase with Flutter.',
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-600',
    glow: 'neon-glow',
    icon: '📱',
    delivery: '3–6 weeks',
    features: ['Single codebase for all platforms', 'Beautiful Material Design UI', 'Fast development & hot reload', 'Native performance', 'Cost-effective solution'],
  },
  {
    title: 'Web Development',
    desc: 'Modern, responsive web applications that deliver exceptional user experiences across all devices.',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-teal-600',
    glow: 'neon-glow',
    icon: '🌐',
    delivery: '4–10 weeks',
    features: ['React & Next.js applications', 'Progressive Web Apps (PWA)', 'E-commerce platforms', 'Custom web applications', 'API development & integration'],
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces that users love, backed by research and best practices.',
    color: 'text-pink-400',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'neon-glow-purple',
    icon: '🎨',
    delivery: '2–4 weeks',
    features: ['User research & testing', 'Wireframing & prototyping', 'Visual design & branding', 'Design systems', 'Accessibility compliance'],
  },
]

const processSteps = [
  { num: '1', title: 'Discovery', desc: 'We understand your business, goals, challenges, and target audience through detailed consultation.', color: 'from-cyan-500 to-blue-600', glow: 'neon-glow', textColor: 'text-cyan-400' },
  { num: '2', title: 'Strategy & Design', desc: 'We create a tailored solution strategy with wireframes, prototypes, and clear milestones.', color: 'from-purple-500 to-fuchsia-600', glow: 'neon-glow-purple', textColor: 'text-purple-400' },
  { num: '3', title: 'Development', desc: 'Our expert team builds your solution using cutting-edge technologies with regular updates.', color: 'from-cyan-500 to-teal-600', glow: 'neon-glow', textColor: 'text-cyan-400' },
  { num: '4', title: 'Launch & Support', desc: 'We deploy your solution and provide ongoing support to ensure continued success.', color: 'from-green-500 to-emerald-600', glow: 'neon-glow', textColor: 'text-green-400' },
]

const technologies = [
  { emoji: '⚛️', name: 'React' },
  { emoji: '📱', name: 'Flutter' },
  { emoji: '🐍', name: 'Python' },
  { emoji: '🍎', name: 'Swift' },
  { emoji: '🤖', name: 'Kotlin' },
  { emoji: '🟢', name: 'Node.js' },
  { emoji: '⚡', name: 'Next.js' },
  { emoji: '🔥', name: 'Firebase' },
  { emoji: '☁️', name: 'AWS' },
  { emoji: '🎨', name: 'Figma' },
  { emoji: '🧠', name: 'TensorFlow' },
  { emoji: '🗄️', name: 'MongoDB' },
]

const whyUs = [
  { emoji: '⚡', title: 'Fast Delivery', desc: 'Agile methodology ensures quick turnaround. Most projects delivered within 4–12 weeks.', color: 'text-cyan-400' },
  { emoji: '💰', title: 'Cost-Effective', desc: 'Competitive pricing without compromising quality. Flexible payment plans available.', color: 'text-purple-400' },
  { emoji: '🛡️', title: 'Quality Assured', desc: 'Rigorous testing and code reviews ensure reliable, bug-free software.', color: 'text-green-400' },
  { emoji: '🔧', title: 'Full Support', desc: 'Ongoing maintenance and dedicated support after project launch.', color: 'text-orange-400' },
  { emoji: '🌟', title: 'Expert Team', desc: '50+ specialists in AI, mobile, web, and design — all under one roof.', color: 'text-pink-400' },
  { emoji: '🔒', title: 'Secure by Default', desc: 'Security best practices built into every layer of your application.', color: 'text-cyan-400' },
]

export default function Services() {
  const pageRef = useScrollReveal()
  usePageTitle('Services')

  return (
    <main id="main-content" ref={pageRef as React.RefObject<HTMLElement>}>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive technology solutions tailored to your business needs"
        description="From AI-powered assistants to mobile apps and web platforms, we deliver excellence in every project"
        breadcrumb="Services"
      />

      {/* Services Grid */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <article key={svc.title} className="glass-card p-8 hover-tilt reveal-on-scroll service-card-hover" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center text-3xl ${svc.glow}`}>
                    {svc.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-gray-400 text-xs font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {svc.delivery}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${svc.color}`}>{svc.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{svc.desc}</p>
                <ul className="space-y-2 mb-6">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center text-gray-400 text-sm">
                      <span className={`${svc.color} mr-2 text-xs`}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`${svc.color} hover:opacity-80 font-semibold inline-flex items-center text-sm group`}>
                  Get Started
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-400">A proven methodology that delivers results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {processSteps.map((step, i) => (
              <div key={step.num} className="process-step text-center reveal-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center ${step.glow}`}>
                  <span className="text-3xl font-bold text-white">{step.num}</span>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${step.textColor}`}>{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-400">Cutting-edge tools and frameworks</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {technologies.map((tech, i) => (
              <div key={tech.name} className="glass-card p-6 text-center hover-tilt reveal-on-scroll" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="text-4xl mb-3">{tech.emoji}</div>
                <h4 className="font-semibold text-gray-300">{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-gray-400">What makes us different</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyUs.map((item, i) => (
              <div key={item.title} className="glass-card p-8 reveal-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className={`text-2xl font-bold mb-4 ${item.color}`}>{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg-animated text-center">
        <div className="container mx-auto px-6 reveal-on-scroll">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">Let's discuss your project and build something great together.</p>
          <Link to="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg neon-glow hover:scale-105 transition-transform duration-300">
            Free Consultation →
          </Link>
        </div>
      </section>
    </main>
  )
}
