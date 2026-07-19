import { useState, type FormEvent } from 'react'
import PageHero from '@/components/PageHero'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { usePageTitle } from '@/hooks/usePageTitle'
import type { ContactForm } from '@/types'

type FormErrors = Partial<Record<keyof ContactForm, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

const initialForm: ContactForm = { name: '', email: '', phone: '', service: '', budget: '', message: '' }

function validate(form: ContactForm): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Full name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.service) errors.service = 'Please select a service.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  else if (form.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.'
  return errors
}

const contactInfo = [
  { icon: '✉️', label: 'Email', value: 'hello@orbytrix.com', href: 'mailto:hello@orbytrix.com' },
  { icon: '📞', label: 'Phone', value: '+1 (234) 567-8900', href: 'tel:+12345678900' },
  { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: '#' },
  { icon: '📍', label: 'Office', value: 'Remote-First, Worldwide', href: '#' },
]

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const pageRef = useScrollReveal()
  usePageTitle('Contact Us')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStatus('loading')
    // Simulate API call — replace with your actual endpoint
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
    setForm(initialForm)
  }

  return (
    <main id="main-content" ref={pageRef as React.RefObject<HTMLElement>}>
      <PageHero
        title="Get In Touch"
        subtitle="Ready to transform your business with AI and technology?"
        description="We'd love to hear about your project. Let's discuss how we can help you achieve your goals."
        breadcrumb="Contact"
      />

      {/* Quick stats */}
      <section className="py-12 bg-slate-900/50 border-y border-cyan-500/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
            {[
              { val: '24-48h', label: 'Response Time', color: 'text-cyan-400' },
              { val: 'Free', label: 'Consultation', color: 'text-purple-400' },
              { val: '24/7', label: 'Support Available', color: 'text-cyan-400' },
              { val: '100%', label: 'Confidential', color: 'text-purple-400' },
            ].map((s, i) => (
              <div key={i} className="reveal-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.val}</div>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="glass-card p-8 reveal-on-scroll">
              <h2 className="text-3xl font-bold mb-2 gradient-text">Send Us a Message</h2>
              <p className="text-gray-400 mb-8">Fill out the form and we'll get back to you within 24–48 hours.</p>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">We'll be in touch within 24–48 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Contact form">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className={`form-input w-full px-4 py-3 bg-slate-800/50 border-2 rounded-lg text-gray-100 focus:outline-none transition-all duration-300 ${errors.name ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'}`}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={`form-input w-full px-4 py-3 bg-slate-800/50 border-2 rounded-lg text-gray-100 focus:outline-none transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'}`}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-8900"
                      className="form-input w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      Service Interested In <span className="text-cyan-400">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      className={`form-input w-full px-4 py-3 bg-slate-800/50 border-2 rounded-lg text-gray-100 focus:outline-none transition-all duration-300 ${errors.service ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'}`}
                    >
                      <option value="">Select a service...</option>
                      <option value="ai-solutions">AI-Powered Solutions</option>
                      <option value="mobile-ios">Mobile App - iOS</option>
                      <option value="mobile-android">Mobile App - Android</option>
                      <option value="mobile-flutter">Mobile App - Flutter</option>
                      <option value="web-development">Web Development</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="custom-software">Custom Software</option>
                      <option value="consulting">Tech Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Budget Range <span className="text-gray-500">(Optional)</span>
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="form-input w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                    >
                      <option value="">Select budget range...</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-25k">$10,000 – $25,000</option>
                      <option value="25k-50k">$25,000 – $50,000</option>
                      <option value="50k-100k">$50,000 – $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                      <option value="not-sure">Not Sure Yet</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      required
                      className={`form-input w-full px-4 py-3 bg-slate-800/50 border-2 rounded-lg text-gray-100 focus:outline-none transition-all duration-300 resize-none ${errors.message ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'}`}
                    />
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg neon-glow hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6 reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="glass-card p-5 flex items-center gap-4 hover:border-cyan-500/50 transition-all duration-300 group block"
                    >
                      <div className="text-3xl">{info.icon}</div>
                      <div>
                        <p className="text-gray-500 text-sm">{info.label}</p>
                        <p className="text-white font-semibold group-hover:text-cyan-400 transition-colors">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office hours */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM EST' },
                    { day: 'Saturday', hours: '10:00 AM – 4:00 PM EST' },
                    { day: 'Sunday', hours: 'Emergency support only' },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between text-gray-400">
                      <span>{row.day}</span>
                      <span className="text-cyan-400">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response commitment */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-3">Our Commitment</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  {[
                    '✅ Reply within 24–48 hours',
                    '✅ Free initial consultation',
                    '✅ No-obligation project estimate',
                    '✅ 100% confidential discussion',
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
