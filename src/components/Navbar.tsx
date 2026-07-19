import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header>
      <nav
        className={`fixed top-0 w-full backdrop-blur-xl border-b z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-900/95 border-cyan-500/30 shadow-lg shadow-black/30'
            : 'bg-slate-900/60 border-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" aria-label="OrbyTrix home">
              <img
                src="/logo.jpg"
                alt="OrbyTrix logo"
                className="w-9 h-9 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300 neon-glow"
              />
              <span className="text-xl font-bold gradient-text">OrbyTrix</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-1" role="menubar">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  role="menuitem"
                  className={`nav-link px-3 py-2 rounded-lg text-sm ${location.pathname === link.to ? 'active' : ''}`}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/contact"
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold rounded-lg neon-glow hover:scale-105 transition-transform duration-300"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              <div className="w-5 flex flex-col gap-1.5 relative">
                <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu — slide down */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container mx-auto px-6 pb-6 pt-2 border-t border-cyan-500/10">
            <div className="space-y-1" role="menu">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  role="menuitem"
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-cyan-400'
                  }`}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="flex items-center justify-center mt-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold rounded-xl neon-glow"
              >
                Get a Quote →
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
