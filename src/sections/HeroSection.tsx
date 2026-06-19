import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const tickerText = '144 heures non-stop \u00B7 Boucle de 1,275 km \u00C9preuve internationale \u00B7 Vidauban, Var \u00B7 Du 24 au 30 avril 2027 \u00B7 '

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const scene = sceneRef.current
    const bg = bgRef.current
    const dateRibbon = dateRef.current
    const ticker = tickerRef.current
    const scrollInd = scrollIndicatorRef.current

    if (!section || !scene || !bg) return

    const ctx = gsap.context(() => {
      gsap.set([dateRibbon, ticker, scrollInd], { opacity: 0, y: 30 })

      const entryTl = gsap.timeline({ delay: 0.3 })

      entryTl
        .to(dateRibbon, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to(ticker, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(scrollInd, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300vh',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          onLeave: () => {
            gsap.to(scene, { opacity: 0, duration: 0.5 })
          },
          onEnterBack: () => {
            gsap.to(scene, { opacity: 1, duration: 0.3 })
          },
        },
      })

      scrollTl.fromTo(
        bg,
        { y: 0, scale: 1 },
        { y: '-15%', scale: 1.08, ease: 'none' },
        0
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: '100dvh' }}>
      {/* Video / Image Background */}
      <div
        ref={sceneRef}
        className="absolute inset-0 overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-bg.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'saturate(0.85) contrast(1.1)' }}
          >
            <source src="/videos/hero-video.webm" type="video/webm" />
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Sky gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)',
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
            }}
          />
          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: '40%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.95) 100%)',
            }}
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Date Ribbon */}
        <div
          ref={dateRef}
          className="absolute pointer-events-auto top-[12vh] left-1/2 -translate-x-1/2 md:left-[auto] md:translate-x-0 md:right-[8vw]"
        >
          <div
            className="flex items-center gap-3 px-5 py-2"
            style={{
              background: 'rgba(10,10,10,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '4px',
              border: '1px solid rgba(240,235,225,0.08)',
            }}
          >
            <Calendar size={16} style={{ color: 'var(--color-gold)' }} />
            <span
              className="font-mono-data text-[13px] tracking-wide"
              style={{ color: 'var(--color-gold)' }}
            >
              24 &ndash; 30 AVRIL 2027
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center"
          style={{ top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <h1
            className="font-display text-parchment"
            style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textShadow: '0 4px 60px rgba(0,0,0,0.5)',
              textWrap: 'balance',
            }}
          >
            6 JOURS
            <br />
            DE L'INFINI
          </h1>
        </div>

        {/* Bottom Ticker */}
        <div
          ref={tickerRef}
          className="absolute bottom-[12vh] left-0 right-0 overflow-hidden"
        >
          <div className="marquee whitespace-nowrap">
            <div className="marquee-track inline-flex animate-marquee">
              <span
                className="inline-block px-8 font-display-italic text-[clamp(1.2rem,2.5vw,1.8rem)] opacity-40"
                style={{ color: 'var(--color-gold)' }}
              >
                {tickerText}{tickerText}
              </span>
              <span
                className="inline-block px-8 font-display-italic text-[clamp(1.2rem,2.5vw,1.8rem)] opacity-40"
                style={{ color: 'var(--color-gold)' }}
              >
                {tickerText}{tickerText}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-[11px] font-medium tracking-[0.15em] uppercase"
            style={{ color: 'var(--color-ash)' }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-6 overflow-hidden">
            <div
              className="w-full h-full animate-scroll-line"
              style={{ background: 'var(--color-ash)' }}
            />
          </div>
          <ChevronDown
            size={18}
            className="animate-scroll-bounce"
            style={{ color: 'var(--color-ash)' }}
          />
        </div>
      </div>
    </section>
  )
}
