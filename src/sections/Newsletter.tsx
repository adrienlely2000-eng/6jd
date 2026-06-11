import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.newsletter-content'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-race-yellow)',
        padding: 'var(--space-xl) 0',
      }}
    >
      <div className="newsletter-content content-narrow text-center">
        <h2
          className="font-display text-3xl md:text-4xl uppercase mb-4"
          style={{ color: 'var(--color-stencil)' }}
        >
          RECEVEZ LES INFOS COURSE
        </h2>
        <p
          className="text-base mb-8 max-w-[480px] mx-auto"
          style={{ color: 'rgba(42,42,42,0.7)' }}
        >
          Inscrivez-vous à la newsletter pour suivre l'actualité des 6 Jours d'Ardèche.
        </p>

        {submitted ? (
          <div
            className="font-display text-2xl uppercase"
            style={{ color: 'var(--color-stencil)' }}
          >
            ✓ VOUS ÊTES INSCRIT !
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
              className="w-full sm:w-auto sm:flex-1 px-5 py-3 text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: 'var(--border-radius-sm)',
                color: 'var(--color-stencil)',
              }}
            />
            <button
              type="submit"
              className="w-full sm:w-auto mt-3 sm:mt-0 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:brightness-90"
              style={{
                background: 'var(--color-stencil)',
                color: 'var(--color-race-yellow)',
                borderRadius: 'var(--border-radius-sm)',
              }}
            >
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
