import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, AlertTriangle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export default function Registration() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const qrUrl = `${window.location.origin}${window.location.pathname}#/inscription`;

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.from(left, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(right, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inscriptions"
      ref={sectionRef}
      className="relative bg-surface-card grain-overlay"
      style={{ padding: 'var(--space-2xl) 0' }}
    >
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column */}
          <div ref={leftRef}>
            <p className="section-label mb-4">— INSCRIPTIONS</p>
            <h2 className="section-h2 mb-6">
              PLACES LIMITÉES.<br />
              DOSSIER OUVERT EN SEPTEMBRE.
            </h2>
            <p
              className="leading-relaxed mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Les inscriptions pour l'édition 2027 ouvrent en septembre 2026. Le nombre de participants est limité pour garantir la sécurité et la qualité de l'événement. Préparez votre dossier d'inscription dès maintenant.
            </p>

            {/* Limited places warning */}
            <div
              className="flex items-start gap-3 p-4 mb-8"
              style={{
                background: 'rgba(255,51,0,0.08)',
                border: '1px solid rgba(255,51,0,0.2)',
                borderRadius: 'var(--border-radius-sm)',
              }}
            >
              <AlertTriangle size={20} style={{ color: 'var(--color-race-red)', flexShrink: 0 }} />
              <div>
                <p
                  className="text-sm font-bold uppercase tracking-wide mb-1"
                  style={{ color: 'var(--color-race-red)' }}
                >
                  Places limitées !
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Dossier d'inscription disponible sur le site
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="mailto:contact@6joursardeche.fr"
                className="flex items-center gap-3 transition-colors duration-200 hover:text-race-yellow group"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Mail size={18} style={{ color: 'var(--color-race-yellow)' }} />
                <span className="text-sm group-hover:text-race-yellow transition-colors">
                  contact@6joursardeche.fr
                </span>
              </a>
              <a
                href="tel:+33662360045"
                className="flex items-center gap-3 transition-colors duration-200 hover:text-race-yellow group"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Phone size={18} style={{ color: 'var(--color-race-yellow)' }} />
                <span className="text-sm group-hover:text-race-yellow transition-colors">
                  06 62 36 00 45
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - QR Code Card */}
          <div ref={rightRef} className="flex items-center justify-center">
            <div
              className="p-8 md:p-10 text-center transition-all duration-300 hover:border-race-yellow w-full max-w-sm"
              style={{
                background: 'var(--color-surface-dark)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 'var(--border-radius-lg)',
              }}
            >
              <button
                onClick={() => navigate('/inscription')}
                className="inline-block p-4 mb-6 transition-transform duration-200 hover:scale-105"
                style={{ background: 'white', borderRadius: 'var(--border-radius-md)' }}
              >
                <QRCodeSVG
                  value={qrUrl}
                  size={180}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#2A2A2A"
                  includeMargin={false}
                />
              </button>
              <p
                className="text-xs font-medium uppercase tracking-wide mb-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Scannez pour vous inscrire
              </p>
              <button
                onClick={() => navigate('/inscription')}
                className="flex items-center gap-2 mx-auto text-sm transition-colors duration-200 hover:text-race-yellow"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span className="font-mono-data">/inscription</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
