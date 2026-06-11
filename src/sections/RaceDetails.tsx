import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Timer, Route, Globe, Users, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Timer, label: '144 HEURES', value: '144h', sub: 'NON-STOP' },
  { icon: Route, label: 'BOUCLE PLATE', value: '1,275', sub: 'KM' },
  { icon: Globe, label: 'ÉPREUVE', value: '6', sub: 'JOURS' },
  { icon: Users, label: 'AMBIANCE', value: '6', sub: 'NUITS' },
];

const features = [
  { icon: Route, title: 'BOUCLE PLATE', desc: '1,275 km par tour, dénivelé nul' },
  { icon: Globe, title: 'ÉPREUVE INTERNATIONALE', desc: 'Coureurs du monde entier' },
  { icon: Users, title: 'AMBIANCE UNIQUE', desc: 'Dépassement de soi collectif' },
  { icon: Heart, title: 'ENTRÉE LIBRE', desc: 'Venez encourager les athlètes' },
];

export default function RaceDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const statsGrid = statsRef.current;
    const featuresGrid = featuresRef.current;

    if (!section || !left || !statsGrid || !featuresGrid) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.from(left, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Stats cards stagger
      const statCards = statsGrid.querySelectorAll('.stat-card');
      gsap.from(statCards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsGrid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Features stagger
      const featureItems = featuresGrid.querySelectorAll('.feature-item');
      gsap.from(featureItems, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresGrid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="course"
      ref={sectionRef}
      className="relative bg-surface-dark grain-overlay"
      style={{ padding: 'var(--space-2xl) 0' }}
    >
      <div className="content-container">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16">
          {/* Left Column */}
          <div ref={leftRef}>
            <p className="section-label mb-4">&mdash; LE D&Eacute;FI</p>
            <h2 className="section-h2 mb-6">
              144 HEURES.<br />
              UNE BOUCLE.<br />
              AUCUNE LIMITE.
            </h2>
            <p
              className="text-lg leading-relaxed max-w-[480px] mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Les 6 Jours d'Ard&egrave;che sont une &eacute;preuve mythique d'ultra-endurance où les athlètes courent sans interruption pendant 144 heures sur une boucle entièrement plate. Une aventure humaine exceptionnelle.
            </p>
            <a
              href="/#/reglement"
              className="inline-block px-8 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:bg-race-yellow hover:text-stencil hover:border-race-yellow"
              style={{
                border: '1px solid var(--color-text-muted)',
                color: 'var(--color-text-primary)',
                borderRadius: 'var(--border-radius-sm)',
              }}
            >
              Voir le règlement →
            </a>
          </div>

          {/* Right Column - Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card p-6 transition-all duration-250 hover:-translate-y-0.5"
                style={{
                  background: 'var(--color-surface-card)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 'var(--border-radius-md)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <stat.icon size={20} style={{ color: 'var(--color-race-yellow)' }} />
                  <span
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {stat.label}
                  </span>
                </div>
                <div className="stat-number">{stat.value}</div>
                <div
                  className="text-sm font-medium uppercase tracking-wide mt-1"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Row */}
        <div
          ref={featuresRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {features.map((feature) => (
            <div key={feature.title} className="feature-item text-center">
              <feature.icon
                size={32}
                className="mx-auto mb-3"
                style={{ color: 'var(--color-race-yellow)' }}
              />
              <p
                className="text-sm font-bold uppercase tracking-wide mb-1"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {feature.title}
              </p>
              <p
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
