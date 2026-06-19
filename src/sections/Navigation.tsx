import { useEffect, useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Le Defi', href: '/#course' },
  { label: 'Inscriptions', href: '/#inscriptions' },
  { label: 'Reglement', href: '/reglement' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/reglement') || href.startsWith('/inscription')) {
      e.preventDefault()
      navigate(href)
      setMobileOpen(false)
      return
    }
    if (href.startsWith('/#')) {
      const hash = href.slice(1)
      if (window.location.pathname === '/') {
        e.preventDefault()
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setMobileOpen(false)
      }
    }
  }, [navigate])

  const handleBrandClick = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10,10,10,0.92)'
            : 'linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 65%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
          borderBottom: scrolled ? '1px solid rgba(240,235,225,0.06)' : '1px solid transparent',
        }}
      >
        <div className="content-container flex items-center justify-between h-16">
          <button
            onClick={handleBrandClick}
            className="font-display text-xl tracking-tight text-[var(--color-gold)] hover:opacity-80 transition-opacity"
          >
            6JI
          </button>

          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 hover:text-[var(--color-gold)] group whitespace-nowrap"
                style={{
                  color: 'var(--color-parchment)',
                  textShadow: scrolled ? 'none' : '0 1px 6px rgba(0,0,0,0.6)',
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href="/#inscriptions"
            onClick={(e) => handleNavClick(e, '/#inscriptions')}
            className="hidden md:block px-5 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition-all duration-200 hover:brightness-110 rounded"
            style={{
              background: 'var(--color-gold)',
              color: 'var(--color-obsidian)',
            }}
          >
            S'inscrire
          </a>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={24} style={{ color: 'var(--color-parchment)' }} />
            ) : (
              <Menu size={24} style={{ color: 'var(--color-parchment)' }} />
            )}
          </button>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden"
        style={{
          background: 'var(--color-obsidian)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <button
          className="absolute top-4 right-4 p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} style={{ color: 'var(--color-parchment)' }} />
        </button>
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-display text-4xl uppercase transition-colors duration-300 hover:text-[var(--color-gold)]"
            style={{
              color: 'var(--color-parchment)',
              transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms`,
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/#inscriptions"
          onClick={(e) => handleNavClick(e, '/#inscriptions')}
          className="mt-4 px-8 py-3 text-lg font-bold uppercase tracking-wide rounded"
          style={{
            background: 'var(--color-gold)',
            color: 'var(--color-obsidian)',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${navLinks.length * 50}ms`,
          }}
        >
          S'inscrire
        </a>
      </div>
    </>
  )
}
