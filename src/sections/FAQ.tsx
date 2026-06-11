import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    question: "Qu'est-ce que les 6 Jours d'Ardèche ?",
    answer: "Les 6 Jours d'Ardèche à Privas sont une épreuve mythique d'ultra-endurance où les athlètes courent sans interruption pendant 144 heures sur une boucle entièrement plate.",
  },
  {
    question: "Quand aura lieu l'édition 2027 ?",
    answer: "L'édition 2027 se déroulera du 24 avril (12h) au 30 avril (12h), soit 144 heures non-stop.",
  },
  {
    question: "Comment s'inscrire ?",
    answer: "Les inscriptions ouvrent en septembre 2026. Un dossier d'inscription est disponible sur le site. Le nombre de places est limité.",
  },
  {
    question: "Quel est le profil de la boucle ?",
    answer: "La boucle est entièrement plate, sur du bitume, avec une distance de 1,275 km par tour.",
  },
  {
    question: "Le public peut-il assister ?",
    answer: "Oui, l'entrée est libre. Venez encourager les athlètes à tout moment de la course, jour et nuit.",
  },
  {
    question: "Comment contacter l'organisation ?",
    answer: "Par email à 6joursdardeche@proton.me ou par téléphone au 06 62 36 00 45.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll('.faq-item');
      gsap.from(items, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative bg-surface-dark grain-overlay"
      style={{ padding: 'var(--space-2xl) 0' }}
    >
      <div className="content-narrow">
        <p className="section-label mb-4 text-center">— FAQ</p>
        <h2 className="section-h2 mb-12 text-center">QUESTIONS FRÉQUENTES</h2>

        <div className="space-y-0">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="faq-item"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span
                  className="text-base font-medium pr-4 transition-colors duration-200 group-hover:text-race-yellow"
                  style={{
                    color: openIndex === index ? 'var(--color-race-yellow)' : 'var(--color-text-primary)',
                  }}
                >
                  {item.question}
                </span>
                <Plus
                  size={20}
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: 'var(--color-race-yellow)',
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-350 ease-out"
                style={{
                  maxHeight: openIndex === index ? '200px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <p
                  className="pb-5 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
