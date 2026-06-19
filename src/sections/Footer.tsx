import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Facebook, Instagram, Globe, Mail, Phone, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const courseLinks = [
  { label: 'Le Defi', href: '#course' },
  { label: 'Reglement', href: '/reglement' },
  { label: 'La Boucle', href: '#course' },
]

const participantLinks = [
  { label: 'Inscriptions', href: '#inscriptions' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Reglement', href: '/reglement' },
  { label: 'Hebergement', href: '#' },
  { label: 'Transport', href: '#' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      const cols = footer.querySelectorAll('.footer-col')
      gsap.from(cols, {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none none' },
      })
    }, footer)

    return () => ctx.revert()
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && !href.startsWith('#/')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative"
      style={{
        background: 'var(--color-ink)',
        borderTop: '1px solid rgba(240,235,225,0.06)',
        padding: '64px 0 32px',
      }}
    >
      <div className="content-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="footer-col">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-2xl"
              style={{ color: 'var(--color-gold)' }}
            >
              6JI
            </button>
            <p className="mt-2 text-[13px]" style={{ color: 'var(--color-ash)' }}>
              6 Jours de l'Infini &mdash; Vidauban
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61590874012163" target="_blank" rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[var(--color-gold)]" style={{ color: 'var(--color-ash)' }} aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-[var(--color-gold)]" style={{ color: 'var(--color-ash)' }} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://sixjd.onrender.com/" target="_blank" rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[var(--color-gold)]" style={{ color: 'var(--color-ash)' }} aria-label="Site web">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Course */}
          <div className="footer-col">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: 'var(--color-gold-muted)' }}>
              COURSE
            </p>
            <ul className="space-y-2">
              {courseLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-[13px] transition-colors duration-300 hover:text-[var(--color-parchment)]" style={{ color: 'var(--color-ash)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Participants */}
          <div className="footer-col">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: 'var(--color-gold-muted)' }}>
              PARTICIPANTS
            </p>
            <ul className="space-y-2">
              {participantLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-[13px] transition-colors duration-300 hover:text-[var(--color-parchment)]" style={{ color: 'var(--color-ash)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: 'var(--color-gold-muted)' }}>
              CONTACT
            </p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:6joursdeinfini@proton.me"
                  className="flex items-center gap-2 text-[13px] transition-colors duration-300 hover:text-[var(--color-gold)]" style={{ color: 'var(--color-ash)' }}>
                  <Mail size={13} /> 6joursdeinfini@proton.me
                </a>
              </li>
              <li>
                <a href="tel:+33662360045"
                  className="flex items-center gap-2 text-[13px] transition-colors duration-300 hover:text-[var(--color-gold)]" style={{ color: 'var(--color-ash)' }}>
                  <Phone size={13} /> 06 62 36 00 45
                </a>
              </li>
              <li>
                <a href="https://sixjd.onrender.com/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] transition-colors duration-300 hover:text-[var(--color-gold)]" style={{ color: 'var(--color-ash)' }}>
                  <Globe size={13} /> sixjd.onrender.com
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/kEHcguxNJGXQrr4JA" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] transition-colors duration-300 hover:text-[var(--color-gold)]" style={{ color: 'var(--color-ash)' }}>
                  <MapPin size={13} /> Stade de Vidauban
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6"
          style={{ borderTop: '1px solid rgba(240,235,225,0.06)' }}
        >
          <p className="text-[11px]" style={{ color: 'var(--color-ash)' }}>
            &copy; 2027 6 Jours de l'Infini. Tous droits reserves.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] transition-colors duration-300 hover:text-[var(--color-parchment)]" style={{ color: 'var(--color-ash)' }}>
              Mentions legales
            </a>
            <span style={{ color: 'var(--color-ash)' }}>&middot;</span>
            <a href="#" className="text-[11px] transition-colors duration-300 hover:text-[var(--color-parchment)]" style={{ color: 'var(--color-ash)' }}>
              Politique de confidentialite
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
