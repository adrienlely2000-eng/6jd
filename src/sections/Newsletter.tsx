import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.newsletter-content'), {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section ref={sectionRef} style={{ background: 'var(--color-gold)', padding: '60px 0' }}>
      <div className="newsletter-content content-narrow text-center" style={{ maxWidth: '600px' }}>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-4" style={{ color: 'var(--color-obsidian)' }}>
          Recevez les infos course
        </h2>
        <p className="text-[14px] mb-8 max-w-[480px] mx-auto" style={{ color: 'rgba(10,10,10,0.7)' }}>
          Inscrivez-vous a la newsletter pour suivre l'actualite des 6 Jours de l'Infini.
        </p>

        {submitted ? (
          <div className="font-display text-2xl" style={{ color: 'var(--color-obsidian)' }}>
            &check; Vous etes inscrit !
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-0 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
              className="w-full sm:w-auto sm:flex-1 px-5 py-3 text-[14px] outline-none rounded-l"
              style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-obsidian)', border: 'none' }}
            />
            <button
              type="submit"
              className="w-full sm:w-auto mt-3 sm:mt-0 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.08em] transition-all duration-200 hover:brightness-90 rounded-r"
              style={{ background: 'var(--color-obsidian)', color: 'var(--color-gold)' }}
            >
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
