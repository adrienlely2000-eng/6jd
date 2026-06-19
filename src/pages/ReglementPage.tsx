import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Article({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(240,235,225,0.08)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-2 text-left transition-all duration-300 hover:bg-[rgba(240,235,225,0.02)] rounded"
      >
        <span className="font-display text-[15px] md:text-lg pr-4">
          <span style={{ color: 'var(--color-gold)' }}>Article {number}</span>
          <span style={{ color: 'var(--color-parchment)' }}> &mdash; {title}</span>
        </span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            color: 'var(--color-gold)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      {open && (
        <div className="px-2 pb-6 text-[13px] md:text-[14px] leading-relaxed" style={{ color: 'var(--color-ash)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default function ReglementPage() {
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll('.regle-article')
      gsap.from(items, {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: content, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }, content)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-obsidian)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(240,235,225,0.06)',
        }}
      >
        <div className="content-container flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[13px] font-medium transition-colors duration-300 hover:text-[var(--color-gold)] group"
            style={{ color: 'var(--color-ash)' }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" style={{ color: 'var(--color-gold)' }} />
            <span>Retour</span>
          </button>
          <span className="font-display text-[13px] tracking-wider hidden sm:block" style={{ color: 'var(--color-gold)' }}>
            6 JOURS DE L'INFINI &mdash; REGLEMENT
          </span>
          <div className="w-16" />
        </div>
      </header>

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--color-obsidian) 0%, var(--color-ink) 100%)',
          borderBottom: '1px solid rgba(240,235,225,0.06)',
        }}
      >
        <div className="content-container py-16 md:py-20 text-center">
          <p className="section-label mb-4">&mdash; Document officiel</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] mb-4" style={{ color: 'var(--color-parchment)' }}>
            REGLEMENT <span style={{ color: 'var(--color-gold)' }}>OFFICIEL</span>
          </h1>
          <p className="text-[15px] md:text-lg" style={{ color: 'var(--color-ash)' }}>
            6 Jours de l'Infini &mdash; 144h non-stop &mdash; Course et marche a pied &mdash; Hommes et Femmes
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="content-container py-12 md:py-16" style={{ maxWidth: '860px' }}>
        <div
          ref={contentRef}
          className="rounded-xl overflow-hidden"
          style={{
            background: 'var(--color-ink)',
            border: '1px solid rgba(240,235,225,0.06)',
          }}
        >
          {/* Article 1 */}
          <div className="regle-article">
            <Article number="1" title="Presentation de l'epreuve">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Intitule :</strong> 6 Jours de l'Infini &ndash; 144 h non-stop.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Nature :</strong> epreuve d'ultrafond de course et de marche, individuelle, circuit ferme, chrono en continu.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Lieu :</strong> Stade de Vidauban, Vidauban (Var &ndash; 83), France.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Dates :</strong> du 24/04/2027 au 30/04/2027.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Organisateur :</strong> Association Les 6 Jours de l'Infini.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Directeur :</strong> contact@6joursdeinfini.fr</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Public :</strong> Adultes (18 ans min.)</li>
              </ul>
            </Article>
          </div>

          {/* Article 2 */}
          <div className="regle-article">
            <Article number="2" title="Parcours et format">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Circuit :</strong> boucle fermee de 1,275 km, revetement bitume, entierement plat.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Objectif :</strong> couvrir la plus grande distance possible en 144 h.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Acces :</strong> reserve aux concurrents, officiels et secours.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Aires :</strong> ravitaillement, assistance, medicale, repos/camping.</li>
              </ul>
            </Article>
          </div>

          {/* Article 3 */}
          <div className="regle-article">
            <Article number="3" title="Conditions d'inscription">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Inscription :</strong> via le site internet ou bulletin signe. Aucune inscription ne sera prise sur place.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Categories :</strong> uniquement reserve aux categories seniors et masters (Masculin et Feminin).</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>PPS :</strong> En application de la loi du 2 mars 2022 visant a democratiser le sport en France et de son decret d'application du 22 juin 2022, la Federation Francaise d'Athletisme, sur avis de sa Commission medicale, a decide de remplacer l'exigence de fourniture d'un certificat medical d'absence de contre-indication, par un parcours educatif et d'information sur les risques lies a la sante dans la pratique de l'athletisme, appele &laquo; Parcours de prevention sante &raquo; (ou &laquo; PPS &raquo;). Deja applicable a tous les licencies majeurs de la FFA depuis septembre 2023, cette obligation vient s'appliquer aujourd'hui a tous les pratiquants majeurs souhaitant s'inscrire a une course qui devront ainsi satisfaire au Parcours de Prevention Sante dans les trois mois avant la manifestation concernee. Ce PPS sera disponible sur la plateforme en ligne de la FFA.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Pieces :</strong> certificat medical (&lt; 12 mois) ou licence FFA/FFCO/FFTri + piece d'identite + acceptation reglement.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Cloture :</strong> 31 mars 2026 ou epuisement dossards.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Pieces obligatoires :</strong> le bulletin d'engagement officiel dument complete et signe, le parcours prevention sante ou copie de votre licence sportive en cours de validite, et le paiement des droits d'engagement a regler par cheque ou par virement bancaire.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Limite :</strong> nombre de coureurs limite pour des raisons de securite.</li>
              </ul>
            </Article>
          </div>

          {/* Article 4 */}
          <div className="regle-article">
            <Article number="4" title="Tarifs et paiement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Tarif plein :</strong> se referer a la grille tarifaire sur le site.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Options :</strong> tente, camping-car, repas (sur inscription).</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Paiement :</strong> virement bancaire ou cheque a l'ordre de l'association, ref &laquo; 6J Infini &ndash; NOM Prenom &raquo;.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Inscription complete :</strong> une inscription validee par l'organisation sera consideree comme complete si elle comporte l'ensemble des pieces du dossier. Les places reservees en bungalow seront prises en compte UNIQUEMENT avec un dossier COMPLET.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Effet :</strong> l'inscription prendra effet a la date de la reception de tous les elements du dossier COMPLET.</li>
              </ul>
            </Article>
          </div>

          {/* Article 5 */}
          <div className="regle-article">
            <Article number="5" title="Annulation et transfert">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>J-60 :</strong> remboursement 80%.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>J-59 a J-30 :</strong> remboursement 50%.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>J-29 a J-15 :</strong> remboursement 25%.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>&lt; J-15 :</strong> aucun remboursement.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Transfert :</strong> autorise jusqu'a J-15, frais de dossier applicables.</li>
              </ul>
            </Article>
          </div>

          {/* Article 6 */}
          <div className="regle-article">
            <Article number="6" title="Assurance et responsabilite">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>RC organisateur :</strong> assuree.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Individuelle :</strong> fortement recommandee (accident + rapatriement).</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Decharge :</strong> participation = acceptation des risques inherents a l'epreuve.</li>
              </ul>
            </Article>
          </div>

          {/* Article 7 */}
          <div className="regle-article">
            <Article number="7" title="Dossards et materiel">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Retrait :</strong> sur presentation piece d'identite.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Port :</strong> visible en permanence, puce non alteree.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Materiel :</strong> lampe frontale, vetements meteo, gobelet, telephone charge.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Interdits :</strong> ecouteurs double oreille, animaux, velos.</li>
              </ul>
            </Article>
          </div>

          {/* Article 8 */}
          <div className="regle-article">
            <Article number="8" title="Chronometrage et classement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Systeme :</strong> puce electronique + comptage manuel.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Chronometreur :</strong> le chronometrage sera effectue par un chronometreur agree utilisant un systeme de chronometrage electronique (puce electronique a la cheville).</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Puce :</strong> tous les inscrits se verront remettre 1 puce electronique a la cheville. La puce electronique devra etre remise a l'organisation a l'arrivee. Un concurrent n'empruntant pas l'ensemble du trace de l'epreuve ne pourra pas etre classe a l'arrivee.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Abandon :</strong> en cas d'abandon, la puce devra imperativement etre remise a l'organisation a l'arrivee de la course par chaque concurrent.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>ATTENTION :</strong> toute puce non recuperee a la fin des 6 jours sera facturee 50 euros et entrainera la disqualification immediate de l'epreuve.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Suivi :</strong> suivi tour par tour ainsi qu'un systeme de messagerie personnalisee sur le telephone portable. Pas de message personnel edite sur papier.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Mesure :</strong> distance totale en 144h.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Categories :</strong> scratch H/F + tranches d'age.</li>
              </ul>
            </Article>
          </div>

          {/* Article 9 */}
          <div className="regle-article">
            <Article number="9" title="Ravitaillement et repas">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Inclus :</strong> eau, isotoniques, cafe/the, fruits, sale.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Repas :</strong> petit-dejeuner, dejeuner, diner (sur inscription).</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Allergies :</strong> signalement obligatoire a l'inscription.</li>
              </ul>
            </Article>
          </div>

          {/* Article 10 */}
          <div className="regle-article">
            <Article number="10" title="Hebergement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Options :</strong> tente, camping-car, zone repos.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Electricite :</strong> limitee, priorite medicale.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Douches/WC :</strong> accessibles 24h/24.</li>
              </ul>
            </Article>
          </div>

          {/* Article 11 */}
          <div className="regle-article">
            <Article number="11" title="Assistance">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Zone :</strong> assistance uniquement dans zone dediee.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Depot :</strong> emplacement numerote par dossard.</li>
              </ul>
            </Article>
          </div>

          {/* Article 12 */}
          <div className="regle-article">
            <Article number="12" title="Securite et medical">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Poste :</strong> 24h/24, infirmier + medecin d'astreinte.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Retrait medical :</strong> possible pour raison de sante.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Kines :</strong> presents sur creneaux.</li>
              </ul>
            </Article>
          </div>

          {/* Article 13 */}
          <div className="regle-article">
            <Article number="13" title="Regles sportives">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Couloirs :</strong> a respecter, depassements courtois.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Marche :</strong> autorisee.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Dopage :</strong> tolerance zero.</li>
              </ul>
            </Article>
          </div>

          {/* Article 14 */}
          <div className="regle-article">
            <Article number="14" title="Comportement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Tenue :</strong> adaptee, dossard visible.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Respect :</strong> benevoles, officiels, concurrents.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Proprete :</strong> tri selectif, interdiction de jeter.</li>
              </ul>
            </Article>
          </div>

          {/* Article 15 */}
          <div className="regle-article">
            <Article number="15" title="Penalites">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Dechet :</strong> +1 tour neutralise.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Assistance illicite :</strong> -1 boucle.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Disqualification :</strong> dopage, fraude, comportement dangereux.</li>
              </ul>
            </Article>
          </div>

          {/* Article 16 */}
          <div className="regle-article">
            <Article number="16" title="Jury">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Composition :</strong> directeur, chrono, medical, coureur.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Reclamations :</strong> dans l'heure, par ecrit.</li>
              </ul>
            </Article>
          </div>

          {/* Article 17 */}
          <div className="regle-article">
            <Article number="17" title="Environnement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--color-parchment)' }}>Bruit :</strong> limitation nocturne.</li>
                <li><strong style={{ color: 'var(--color-parchment)' }}>Lumieres :</strong> frontales vers le sol.</li>
              </ul>
            </Article>
          </div>

          {/* Article 18 */}
          <div className="regle-article">
            <Article number="18" title="Annulation organisateur">
              <p className="pb-2">Report prioritaire ou remboursement partiel apres deduction des frais. Aucun dedommagement indirect (transport, hebergement).</p>
            </Article>
          </div>

          {/* Article 19 */}
          <div className="regle-article">
            <Article number="19" title="Droit a l'image">
              <p className="pb-2">Autorisation d'utilisation image/video pour 5 ans. Opposition ecrite possible.</p>
            </Article>
          </div>

          {/* Article 20 */}
          <div className="regle-article">
            <Article number="20" title="Acceptation">
              <p className="pb-2">L'inscription vaut acceptation pleine et entiere du reglement. Ajustements possibles jusqu'au depart.</p>
            </Article>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/inscription')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display text-[15px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'var(--color-gold)', color: 'var(--color-obsidian)' }}
          >
            S'INSCRIRE MAINTENANT
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--color-ink)', borderTop: '1px solid rgba(240,235,225,0.06)', padding: '32px 0' }}>
        <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px]" style={{ color: 'var(--color-ash)' }}>
            &copy; 2027 6 Jours de l'Infini. Tous droits reserves.
          </p>
          <button onClick={() => navigate('/')} className="font-display text-lg" style={{ color: 'var(--color-gold)' }}>
            6JI
          </button>
        </div>
      </footer>
    </div>
  )
}
