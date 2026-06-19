import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { QRCodeSVG } from 'qrcode.react'
import { Mail, Phone, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function Registration() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const qrUrl = `${window.location.origin}${window.location.pathname}#/inscription`

  useEffect(() => {
    const section = sectionRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!section || !left || !right) return

    const ctx = gsap.context(() => {
      gsap.from(left, { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
      })
      gsap.from(right, { x: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="inscriptions" ref={sectionRef} className="relative bg-ink grain-overlay" style={{ padding: '120px 0' }}>
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column */}
          <div ref={leftRef}>
            <p className="section-label mb-4">&mdash; Inscriptions</p>
            <h2 className="section-h2 mb-6">
              Places limitees.<br />
              Dossier ouvert en septembre.
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--color-ash)' }}>
              Les inscriptions pour l'edition 2027 ouvrent en septembre 2026. Le nombre de participants est limite pour garantir la securite et la qualite de l'evenement. Preparez votre dossier d'inscription des maintenant.
            </p>

            {/* Warning */}
            <div
              className="flex items-start gap-3 p-4 mb-8 rounded"
              style={{
                background: 'var(--color-ember-muted)',
                border: '1px solid rgba(201,74,60,0.2)',
              }}
            >
              <AlertTriangle size={20} style={{ color: 'var(--color-ember)', flexShrink: 0 }} />
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] mb-1" style={{ color: 'var(--color-ember)' }}>
                  Places limitees !
                </p>
                <p className="text-[13px]" style={{ color: 'var(--color-ash)' }}>
                  Dossier d'inscription disponible sur le site
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="mailto:6joursdeinfini@proton.me"
                className="flex items-center gap-3 text-[13px] transition-colors duration-300 hover:text-[var(--color-gold)] group"
                style={{ color: 'var(--color-ash)' }}
              >
                <Mail size={16} style={{ color: 'var(--color-gold)' }} />
                <span className="group-hover:text-[var(--color-gold)] transition-colors">6joursdeinfini@proton.me</span>
              </a>
              <a
                href="tel:+33662360045"
                className="flex items-center gap-3 text-[13px] transition-colors duration-300 hover:text-[var(--color-gold)] group"
                style={{ color: 'var(--color-ash)' }}
              >
                <Phone size={16} style={{ color: 'var(--color-gold)' }} />
                <span className="group-hover:text-[var(--color-gold)] transition-colors">06 62 36 00 45</span>
              </a>
            </div>
          </div>

          {/* Right Column - QR Code */}
          <div ref={rightRef} className="flex items-center justify-center">
            <div
              className="p-8 md:p-10 text-center transition-all duration-300 hover:border-[var(--color-gold)] w-full max-w-sm rounded-2xl cursor-pointer"
              style={{
                background: 'var(--color-obsidian)',
                border: '1px solid rgba(240,235,225,0.06)',
              }}
              onClick={() => navigate('/inscription')}
            >
              <div className="inline-block p-4 mb-6 transition-transform duration-200 hover:scale-105 bg-white rounded-lg">
                <QRCodeSVG
                  value={qrUrl}
                  size={160}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#2A2A2A"
                  includeMargin={false}
                />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--color-ash)' }}>
                Scannez pour vous inscrire
              </p>
              <span className="font-mono-data text-[13px]" style={{ color: 'var(--color-ash)' }}>
                /inscription
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
