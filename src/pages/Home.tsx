import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGalaxy } from '@/hooks/useGalaxy'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import StatCounter from '@/components/StatCounter'
import Testimonials from '@/components/Testimonials'
import TechOrbit from '@/components/TechOrbit'

const stats = [
  { value: '500+', label: 'Projects Delivered', color: 'text-cyan-400' },
  { value: '98%',  label: 'Client Satisfaction', color: 'text-purple-400' },
  { value: '50+',  label: 'Team Members',        color: 'text-cyan-400' },
  { value: '24/7', label: 'Support Available',   color: 'text-purple-400' },
]

const TYPING_PHRASES = [
  'With Intelligent Software Solutions',
  'With AI-Powered Assistants',
  'With Beautiful Mobile Apps',
  'With Scalable Web Platforms',
  'With Cutting-Edge Technology',
]

const services = [
  {
    title: 'AI-Powered Solutions',
    desc: 'Build intelligent AI assistants like Siri that understand, learn, and manage your business operations autonomously.',
    color: 'text-cyan-400',
    glow: 'neon-glow',
    gradient: 'from-cyan-500 to-blue-600',
    features: ['Voice-activated AI assistants', 'Machine learning models', 'Natural language processing'],
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Mobile App Development',
    desc: 'Native iOS and Android apps, plus cross-platform solutions with Flutter for maximum reach and performance.',
    color: 'text-purple-400',
    glow: 'neon-glow-purple',
    gradient: 'from-purple-500 to-fuchsia-600',
    features: ['iOS (Swift) development', 'Android (Kotlin) development', 'Flutter cross-platform apps'],
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Web Platforms',
    desc: 'Modern, responsive web applications that deliver exceptional user experiences across all devices.',
    color: 'text-cyan-400',
    glow: 'neon-glow',
    gradient: 'from-cyan-500 to-teal-600',
    features: ['Progressive web apps (PWA)', 'E-commerce platforms', 'Custom web applications'],
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces that users love, backed by research and best practices.',
    color: 'text-pink-400',
    glow: 'neon-glow-purple',
    gradient: 'from-pink-500 to-rose-600',
    features: ['User research & testing', 'Wireframing & prototyping', 'Visual design & branding'],
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Custom Software',
    desc: 'Tailored software solutions designed specifically for your unique business requirements.',
    color: 'text-green-400',
    glow: 'neon-glow',
    gradient: 'from-green-500 to-emerald-600',
    features: ['Business automation tools', 'CRM & ERP systems', 'API development & integration'],
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Tech Consulting',
    desc: 'Expert guidance to help you make the right technology decisions for your business.',
    color: 'text-orange-400',
    glow: 'neon-glow-purple',
    gradient: 'from-orange-500 to-amber-600',
    features: ['Technology strategy', 'Digital transformation', 'Architecture planning'],
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const processSteps = [
  { num: '1', title: 'Discovery', desc: 'We understand your business, goals, challenges, and target audience through detailed consultation.', color: 'from-cyan-500 to-blue-600', glow: 'neon-glow', textColor: 'text-cyan-400' },
  { num: '2', title: 'Strategy & Design', desc: 'We create a tailored solution with wireframes, prototypes, and clear milestones.', color: 'from-purple-500 to-fuchsia-600', glow: 'neon-glow-purple', textColor: 'text-purple-400' },
  { num: '3', title: 'Development', desc: 'Our expert team builds your solution using cutting-edge technologies with regular updates.', color: 'from-cyan-500 to-teal-600', glow: 'neon-glow', textColor: 'text-cyan-400' },
  { num: '4', title: 'Launch & Support', desc: 'We deploy your solution and provide ongoing support to ensure continued success.', color: 'from-green-500 to-emerald-600', glow: 'neon-glow', textColor: 'text-green-400' },
]

// Delays matching the original HTML data-delay attributes: 0,1,2,3,4 seconds
const MESSAGE_DELAYS = [0, 1, 2, 3, 4]

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pageRef = useScrollReveal()
  useGalaxy(canvasRef)

  const typedText = useTypingEffect(TYPING_PHRASES)

  // Replicate original initHeroMessages() — setTimeout per message delay
  const [visible, setVisible] = useState<boolean[]>(MESSAGE_DELAYS.map(() => false))

  useEffect(() => {
    const timers = MESSAGE_DELAYS.map((delay, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, delay * 1000)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const msgStyle = (i: number): React.CSSProperties => ({
    opacity: visible[i] ? 1 : 0,
    transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  })

  return (
    <main id="main-content" ref={pageRef as React.RefObject<HTMLElement>}>

      {/* ── HERO — faithfully recreated from original HTML/JS ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
        aria-labelledby="hero-heading"
      >
        {/* Animated galaxy canvas — full screen, same as original */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div id="hero-messages" className="space-y-6">

              {/* Message 0 — h1, delay 0s */}
              <h1
                id="hero-heading"
                className="text-4xl md:text-6xl lg:text-7xl font-bold"
                style={msgStyle(0)}
              >
                <span className="gradient-text">Transform Your Business</span>
              </h1>

              {/* Message 1 — typing effect, delay 1s */}
              <p className="text-xl md:text-3xl text-cyan-400 font-semibold min-h-[2.5rem]" style={msgStyle(1)}>
                {typedText}
                <span className="typing-cursor" aria-hidden="true">|</span>
              </p>

              {/* Message 2 — delay 2s */}
              <p className="text-lg md:text-2xl text-gray-300" style={msgStyle(2)}>
                We build AI-powered tools, mobile apps, and web platforms
              </p>

              {/* Message 3 — delay 3s */}
              <p className="text-base md:text-xl text-gray-400" style={msgStyle(3)}>
                That save your time and accelerate your growth
              </p>

              {/* Message 4 — CTA buttons, delay 4s */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                style={msgStyle(4)}
              >
                <Link
                  to="/services"
                  className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg neon-glow transition-all duration-300"
                >
                  Discover Our Services
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg neon-glow-purple transition-all duration-300"
                >
                  Start Your Project
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll indicator — original SVG path (down arrow with stem) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats with animated counters */}
      <section className="py-16 bg-slate-900/50 border-y border-cyan-500/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <StatCounter key={i} value={stat.value} label={stat.label} color={stat.color} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Our Services</span>
            </h2>
            <p className="text-xl text-gray-400">Comprehensive solutions tailored to your business needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <article
                key={svc.title}
                className="glass-card p-8 hover-tilt reveal-on-scroll"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={`w-16 h-16 mb-6 rounded-lg bg-gradient-to-br ${svc.gradient} flex items-center justify-center ${svc.glow}`}>
                  {svc.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${svc.color}`}>{svc.title}</h3>
                <p className="text-gray-400 mb-4">{svc.desc}</p>
                <ul className="space-y-2 text-gray-400">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-start">
                      <span className={`${svc.color} mr-2`}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Orbit */}
      <TechOrbit />

      {/* AI Assistant Showcase */}
      <section className="py-28 bg-slate-950 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section label */}
          <div className="flex justify-center mb-4 reveal-on-scroll">
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              AI Technology
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

            {/* Left — content */}
            <div className="reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Your AI-Powered</span>
                <br />
                <span className="text-white">Business CEO</span>
              </h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                Imagine having an AI assistant that manages your business like a seasoned CEO —
                understanding your needs, making intelligent decisions, and executing tasks autonomously around the clock.
              </p>

              {/* Feature list — pill style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: '🎤', title: 'Voice Control',        desc: 'Natural language commands',       color: 'border-cyan-500/30 bg-cyan-500/5',    textColor: 'text-cyan-400' },
                  { icon: '🧠', title: 'Smart Decisions',      desc: 'Learns your preferences',         color: 'border-purple-500/30 bg-purple-500/5', textColor: 'text-purple-400' },
                  { icon: '📊', title: 'Live Analytics',       desc: 'Real-time business insights',     color: 'border-cyan-500/30 bg-cyan-500/5',    textColor: 'text-cyan-400' },
                  { icon: '🔄', title: '24/7 Automation',      desc: 'Never sleeps, always working',    color: 'border-purple-500/30 bg-purple-500/5', textColor: 'text-purple-400' },
                  { icon: '📧', title: 'Auto Communication',   desc: 'Emails & reports sent for you',   color: 'border-cyan-500/30 bg-cyan-500/5',    textColor: 'text-cyan-400' },
                  { icon: '🚀', title: 'Continuous Learning',  desc: 'Gets smarter every day',          color: 'border-purple-500/30 bg-purple-500/5', textColor: 'text-purple-400' },
                ].map((f) => (
                  <div key={f.title} className={`flex items-start gap-3 p-4 rounded-xl border ${f.color} backdrop-blur-sm`}>
                    <span className="text-2xl leading-none mt-0.5">{f.icon}</span>
                    <div>
                      <p className={`font-semibold text-sm ${f.textColor}`}>{f.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl neon-glow hover:scale-105 transition-transform duration-300"
              >
                <span>Build Your AI Assistant</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right — chat UI */}
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" />

                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-900">
                  {/* Chat header */}
                  <div className="flex items-center gap-3 px-5 py-4 bg-slate-800/80 border-b border-cyan-500/10">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-sm neon-glow shrink-0">
                      🤖
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">VoiceFlow AI</p>
                      <p className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                        Active · Managing your business
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="p-5 space-y-5 bg-slate-900/50">
                    {[
                      {
                        from: 'user',
                        text: 'Show me today\'s sales report',
                        time: '9:14 AM',
                      },
                      {
                        from: 'ai',
                        text: 'Sales are up 23% today! Revenue: $45,230. Top product: Premium Plan. I\'ve already scheduled a team meeting to discuss scaling strategies. 📈',
                        time: '9:14 AM',
                        tags: ['Revenue +23%', 'Meeting Scheduled'],
                      },
                      {
                        from: 'user',
                        text: 'Perfect! Send the report to my team',
                        time: '9:15 AM',
                      },
                      {
                        from: 'ai',
                        text: 'Done! Report sent to all 12 members. I also found 3 hot leads from today\'s traffic. Want me to reach out? ✅',
                        time: '9:15 AM',
                        tags: ['12 Notified', '3 Leads Found'],
                      },
                    ].map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.from === 'ai' ? '' : 'flex-row-reverse'}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-bold
                          ${msg.from === 'user'
                            ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-gray-300'
                            : 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white'
                          }`}
                        >
                          {msg.from === 'user' ? 'You' : 'AI'}
                        </div>

                        <div className={`flex flex-col gap-1.5 max-w-[78%] ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
                            ${msg.from === 'user'
                              ? 'bg-slate-700 text-gray-200 rounded-tr-sm'
                              : 'bg-gradient-to-br from-cyan-500/15 to-purple-500/10 border border-cyan-500/20 text-gray-200 rounded-tl-sm'
                            }`}
                          >
                            {msg.text}
                          </div>

                          {/* Tags */}
                          {'tags' in msg && msg.tags && (
                            <div className="flex flex-wrap gap-1.5">
                              {msg.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[10px] font-semibold">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <span className="text-[10px] text-gray-600">{msg.time}</span>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs text-white font-bold shrink-0">
                        AI
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-gradient-to-br from-cyan-500/10 to-purple-500/5 border border-cyan-500/15 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="px-5 py-4 bg-slate-800/60 border-t border-cyan-500/10 flex items-center gap-3">
                    <div className="flex-1 bg-slate-700/50 rounded-xl px-4 py-2.5 text-gray-500 text-sm border border-slate-600/50">
                      Ask your AI anything…
                    </div>
                    <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">How We Work</span>
            </h2>
            <p className="text-xl text-gray-400">Simple, transparent process from idea to launch</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="process-step text-center reveal-on-scroll"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
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

      {/* Testimonials */}
      <Testimonials />

      {/* Trusted by strip */}
      <section className="py-12 bg-slate-950 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">Trusted by innovative companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-40">
            {['HealthTech Co.', 'ShopEase', 'PropFinder', 'EduLearn', 'MediCare Pro', 'TravelEase'].map((name) => (
              <span key={name} className="text-gray-300 font-semibold text-sm md:text-base tracking-wide whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-bg-animated">
        <div className="container mx-auto px-6 text-center reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's turn your vision into reality. Get a free consultation and project estimate.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg rounded-lg neon-glow hover:scale-105 transition-transform duration-300"
          >
            Start Your Project Today →
          </Link>
        </div>
      </section>

    </main>
  )
}
