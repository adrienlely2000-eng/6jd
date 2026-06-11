import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Globe, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const courseLinks = [
  { label: 'Le Défi', href: '#course' },
  { label: 'Règlement', href: '#course' },
  { label: 'La Boucle', href: '#course' },
  { label: 'Résultats', href: '#' },
];

const participantLinks = [
  { label: 'Inscriptions', href: '#inscriptions' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Reglement', href: '#/reglement' },
  { label: 'Hébergement', href: '#' },
  { label: 'Transport', href: '#' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const cols = footer.querySelectorAll('.footer-col');
      gsap.from(cols, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      style={{
        background: 'var(--color-stencil)',
        padding: 'var(--space-lg) 0 var(--space-md)',
      }}
    >
      <div className="content-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Brand */}
          <div className="footer-col">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display text-2xl"
              style={{ color: 'var(--color-race-yellow)' }}
            >
              6JDA
            </a>
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              6 Jours d'Ardèche — Privas
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61590874012163"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-race-yellow"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#"
                className="transition-colors duration-200 hover:text-race-yellow"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://sixjd.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-race-yellow"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Site web"
              >
                <Globe size={22} />
              </a>
            </div>
          </div>

          {/* Column 2 - Course */}
          <div className="footer-col">
            <p
              className="text-xs font-bold uppercase tracking-wide mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              COURSE
            </p>
            <ul className="space-y-2">
              {courseLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm transition-colors duration-200 hover:text-text-primary"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Participants */}
          <div className="footer-col">
            <p
              className="text-xs font-bold uppercase tracking-wide mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              PARTICIPANTS
            </p>
            <ul className="space-y-2">
              {participantLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm transition-colors duration-200 hover:text-text-primary"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="footer-col">
            <p
              className="text-xs font-bold uppercase tracking-wide mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              CONTACT
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:6joursdardeche@proton.me"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-race-yellow"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Mail size={14} />
                  6joursdardeche@proton.me
                </a>
              </li>
              <li>
                <a
                  href="tel:+33662360045"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-race-yellow"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Phone size={14} />
                  06 62 36 00 45
                </a>
              </li>
              <li>
                <a
                  href="https://sixjd.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-race-yellow"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Globe size={14} />
                  https://sixjd.onrender.com/
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/CafEYJWuZoywax8h6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-race-yellow"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <MapPin size={14} />
                  maps stade – Privas
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © 2027 6 Jours d'Ardèche. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs transition-colors duration-200 hover:text-text-primary"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Mentions légales
            </a>
            <span style={{ color: 'var(--color-text-muted)' }}>·</span>
            <a
              href="#"
              className="text-xs transition-colors duration-200 hover:text-text-primary"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
