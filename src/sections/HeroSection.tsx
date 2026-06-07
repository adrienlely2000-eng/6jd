import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tickerText = '6 JOURS POUR ECRIRE VOTRE LEGENDE \u00B7 144 HEURES NON-STOP \u00B7 BOUCLE DE 1,275 KM \u00B7 EPREUVE INTERNATIONALE \u00B7 ';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const bg = bgRef.current;
    const badge = badgeRef.current;
    const dateRibbon = dateRef.current;
    const ticker = tickerRef.current;
    const scrollInd = scrollIndicatorRef.current;

    if (!section || !scene || !bg) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([badge, dateRibbon, ticker, scrollInd], { opacity: 0, y: 30 });
      // Entry animation timeline
      const entryTl = gsap.timeline({ delay: 0.3 });

      entryTl
        .to(badge, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .to(dateRibbon, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to(ticker, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to(scrollInd, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

      // Scroll-driven parallax timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=500vh',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          onLeave: () => {
            gsap.to(scene, { opacity: 0, duration: 0.5 });
          },
          onEnterBack: () => {
            gsap.to(scene, { opacity: 1, duration: 0.3 });
          },
        },
      });

      // Background parallax - moves up and scales slightly
      scrollTl.fromTo(
        bg,
        { y: 0, scale: 1 },
        { y: '-15%', scale: 1.1, ease: 'none' },
        0
      );


    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: '100vh' }}>
      {/* 3D Scene */}
      <div
        ref={sceneRef}
        className="absolute inset-0 overflow-hidden"
        style={{
          background: 'var(--color-hero-bg)',
          perspective: '1200px',
        }}
      >
        {/* Background Layer */}
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <picture className="absolute inset-0 w-full h-full">
            <source media="(max-width: 767px)" srcSet="/images/hero-bg-mobile.jpg?v=2" />
            <source media="(min-width: 768px)" srcSet="/images/hero-bg.jpg?v=2" />
            <img
              src="/images/hero-bg.jpg?v=2"
              alt="6 Jours d'Ardeche"
              className="w-full h-full object-cover object-[center_65%] md:object-center"
              style={{ filter: 'saturate(0.85) contrast(1.1)' }}
              loading="eager"
            />
          </picture>
          {/* Sky gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(200,210,220,0.15) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)',
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
            }}
          />
        </div>

        {/* Road overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '35%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(61,61,61,0.3) 30%, rgba(61,61,61,0.8) 100%)',
          }}
        />

      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Date Ribbon */}
        {/* Mobile: top-[20vh] | PC (md): md:top-[10vh] */}
        <div
          ref={dateRef}
          className="absolute pointer-events-auto top-[8vh] left-[18vw] md:top-[10vh] md:left-[40vw]"
        >
          <div
            className="flex items-center gap-3 px-5 py-1"
            style={{
              background: 'rgba(18,18,18,0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
          
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Calendar size={18} style={{ color: 'var(--color-race-yellow)' }} />
            <span
              className="font-mono-data text-sm md:text-base"
              style={{ color: 'var(--color-race-yellow)' }}
            >
              24 - 30 AVRIL 2027
            </span>
          </div>
        </div>

        {/* Challenge Badge */}
        <div
          className="absolute pointer-events-auto hidden md:block"
          style={{ top: '50vh', right: '8vw' }}
        >
          <div
            className="px-4 py-3 text-center"
            style={{
              background: 'rgba(18,18,18,0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid rgba(255,229,0,0.3)',
              maxWidth: '180px',
            }}
          >
            <p className="font-display text-sm" style={{ color: 'var(--color-race-yellow)' }}>
              6 JOURS
            </p>
            <p className="font-display text-sm" style={{ color: 'var(--color-race-yellow)' }}>
              6 NUITS
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              1 SEUL DEFI :
            </p>
            <p className="font-display text-sm" style={{ color: 'var(--color-text-primary)' }}>
              SE DEPASSER !
            </p>
          </div>
        </div>

        {/* Bottom Ticker */}
        <div
          ref={tickerRef}
          className="absolute bottom-[12vh] left-0 right-0 overflow-hidden"
        >
          <div className="marquee whitespace-nowrap">
            <div className="marquee-track inline-flex animate-marquee">
              <span
                className="inline-block px-8 font-display text-2xl md:text-4xl opacity-50"
                style={{ color: 'var(--color-race-yellow)' }}
              >
                {tickerText}{tickerText}
              </span>
              <span
                className="inline-block px-8 font-display text-2xl md:text-4xl opacity-50"
                style={{ color: 'var(--color-race-yellow)' }}
              >
                {tickerText}{tickerText}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span
            className="text-xs font-medium tracking-widest"
            style={{ color: 'var(--color-text-muted)' }}
          >
            SCROLL
          </span>
          <ChevronDown
            size={20}
            className="animate-scroll-bounce"
            style={{ color: 'var(--color-text-muted)' }}
          />
        </div>
      </div>
    </section>
  );
}
