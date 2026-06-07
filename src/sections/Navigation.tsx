import { useEffect, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Règlement', href: '/#/reglement' },
  { label: 'Inscriptions', href: '#inscriptions' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/')) return;
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(18,18,18,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="content-container flex items-center justify-between h-16">
          <a
            href="/#/"
            className="font-display text-xl tracking-tight"
            style={{ color: 'var(--color-race-yellow)' }}
          >
            6JDA
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium transition-colors duration-200 hover:text-race-yellow"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#inscriptions"
            onClick={(e) => handleNavClick(e, '#inscriptions')}
            className="hidden md:block px-5 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: 'var(--color-race-yellow)',
              color: 'var(--color-stencil)',
              borderRadius: 'var(--border-radius-sm)',
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
              <X size={24} style={{ color: 'var(--color-text-primary)' }} />
            ) : (
              <Menu size={24} style={{ color: 'var(--color-text-primary)' }} />
            )}
          </button>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden"
        style={{
          background: 'var(--color-surface-dark)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <button
          className="absolute top-4 right-4 p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} style={{ color: 'var(--color-text-primary)' }} />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-display text-3xl uppercase transition-colors duration-200 hover:text-race-yellow"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#inscriptions"
          onClick={(e) => handleNavClick(e, '#inscriptions')}
          className="mt-4 px-8 py-3 text-lg font-bold uppercase tracking-wide"
          style={{
            background: 'var(--color-race-yellow)',
            color: 'var(--color-stencil)',
            borderRadius: 'var(--border-radius-sm)',
          }}
        >
          S'inscrire
        </a>
      </div>
    </>
  );
}
