import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Timer, Route, Globe, Users, Heart, Moon } from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Timer, label: 'HEURES NON-STOP', value: '144', sub: 'h' },
  { icon: Route, label: 'KM PAR TOUR', value: '1,275', sub: 'km' },
  { icon: Globe, label: 'JOURS', value: '6', sub: 'jours' },
  { icon: Moon, label: 'NUITS', value: '6', sub: 'nuits' },
]

const features = [
  { icon: Route, title: 'BOUCLE PLATE', desc: '1,275 km par tour, denivele nul' },
  { icon: Globe, title: 'EPREUVE INTERNATIONALE', desc: 'Coureurs du monde entier' },
  { icon: Users, title: 'AMBIANCE UNIQUE', desc: 'Depassement de soi collectif' },
  { icon: Heart, title: 'ENTREE LIBRE', desc: 'Venez encourager les athletes' },
]

export default function RaceDetails() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const left = leftRef.current
    const statsGrid = statsRef.current
    const featuresGrid = featuresRef.current
    if (!section || !left || !statsGrid || !featuresGrid) return

    const ctx = gsap.context(() => {
      gsap.from(left.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      })

      const statCards = statsGrid.querySelectorAll('.stat-card')
      gsap.from(statCards, {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: statsGrid, start: 'top 80%', toggleActions: 'play none none none' },
      })

      const featureItems = featuresGrid.querySelectorAll('.feature-item')
      gsap.from(featureItems, {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: featuresGrid, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="course" ref={sectionRef} className="relative bg-obsidian grain-overlay" style={{ padding: '120px 0' }}>
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* Left Column */}
          <div ref={leftRef}>
            <p className="section-label mb-4">&mdash; Le Defi</p>
            <h2 className="section-h2 mb-6">
              144 heures.<br />
              Une boucle.<br />
              Aucune limite.
            </h2>
            <p className="text-base leading-relaxed max-w-[480px] mb-8" style={{ color: 'var(--color-ash)' }}>
              Les 6 Jours de l'Infini a Vidauban sont une epreuve mythique d'ultra-endurance ou les athletes courent sans interruption pendant 144 heures sur une boucle entierement plate. Une aventure humaine exceptionnelle.
            </p>
            <Link
              to="/reglement"
              className="inline-block px-8 py-3 text-[12px] font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)] rounded"
              style={{ border: '1px solid var(--color-gold-muted)', color: 'var(--color-parchment)' }}
            >
              Voir le reglement &rarr;
            </Link>
          </div>

          {/* Right Column - Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card p-6 transition-all duration-300 hover:-translate-y-1 rounded-lg"
                style={{
                  background: 'var(--color-ink)',
                  border: '1px solid rgba(240,235,225,0.04)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <stat.icon size={18} style={{ color: 'var(--color-gold)' }} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--color-ash)' }}>
                    {stat.label}
                  </span>
                </div>
                <div className="stat-number">{stat.value}</div>
                <div className="text-[12px] font-medium uppercase tracking-[0.08em] mt-1" style={{ color: 'var(--color-ash)' }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Row */}
        <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {features.map((feature) => (
            <div key={feature.title} className="feature-item text-center">
              <feature.icon size={28} className="mx-auto mb-3" style={{ color: 'var(--color-gold)' }} />
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] mb-1" style={{ color: 'var(--color-parchment)' }}>
                {feature.title}
              </p>
              <p className="text-[13px]" style={{ color: 'var(--color-ash)' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
