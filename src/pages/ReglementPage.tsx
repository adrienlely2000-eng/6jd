import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, ArrowLeft } from "lucide-react";

function Article({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 px-4 text-left hover:bg-white/5 transition-colors">
        <span className="font-display text-base md:text-lg">
          <span className="text-[var(--color-race-yellow)]">Article {number}</span> — {title}
        </span>
        <ChevronDown size={20} className={`transition-transform flex-shrink-0 ml-4 text-[var(--color-race-yellow)] ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-6 text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)]">{children}</div>}
    </div>
  );
}

export default function ReglementPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center border-b border-white/5 bg-[rgba(13,13,13,0.85)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-[var(--color-race-yellow)]" />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">Retour</span>
          </Link>
          <span className="font-display text-sm tracking-wider text-[var(--color-race-yellow)]">6 JOURS D'ARDECHE — REGLEMENT</span>
          <div className="w-20" />
        </div>
      </header>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <img src="/images/logo-reglement.png" alt="6 Jours d'Ardeche" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
          </div>

          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-5xl mb-4 text-[var(--color-text-primary)]">
              REGLEMENT <span className="text-[var(--color-race-yellow)]">OFFICIEL</span>
            </h1>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)]">
              6 Jours d'Ardeche — 144h non-stop — Course et marche a pied — Hommes et Femmes
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-[rgba(255,255,255,0.02)]">
            <Article number="1" title="Presentation de l'epreuve">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Intitule :</strong> 6 Jours d'Ardeche – 144 h non-stop.</li>
                <li><strong className="text-[var(--color-text-primary)]">Nature :</strong> epreuve d'ultrafond de course et de marche, individuelle, circuit ferme, chrono en continu.</li>
                <li><strong className="text-[var(--color-text-primary)]">Lieu :</strong> Stade [Nom], Privas (Ardeche – 07), France.</li>
                <li><strong className="text-[var(--color-text-primary)]">Dates :</strong> du [JJ/MM/AAAA] au [JJ/MM/AAAA].</li>
                <li><strong className="text-[var(--color-text-primary)]">Organisateur :</strong> [Nom association], SIRET [xxxx].</li>
                <li><strong className="text-[var(--color-text-primary)]">Directeur :</strong> [Nom + contact].</li>
                <li><strong className="text-[var(--color-text-primary)]">Public :</strong> Adultes (18 ans min.)</li>
              </ul>
            </Article>

            <Article number="2" title="Parcours et format">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Circuit :</strong> boucle fermee de [xxx km], revetement [piste/route].</li>
                <li><strong className="text-[var(--color-text-primary)]">Objectif :</strong> couvrir la plus grande distance possible en 144 h.</li>
                <li><strong className="text-[var(--color-text-primary)]">Acces :</strong> reserve aux concurrents, officiels et secours.</li>
                <li><strong className="text-[var(--color-text-primary)]">Aires :</strong> ravitaillement, assistance, medicale, repos/camping.</li>
              </ul>
            </Article>

            <Article number="3" title="Conditions d'inscription">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Inscription :</strong> via URL ou bulletin signe.</li>
                <li><strong className="text-[var(--color-text-primary)]">Aucune inscription ne sera prise sur place.</strong></li>
                <li><strong className="text-[var(--color-text-primary)]">Categories :</strong> uniquement reserve aux categories seniors et masters (Masculin et Feminin).</li>
                <li><strong className="text-[var(--color-text-primary)]">PPS :</strong> En application de la loi du 2 mars 2022 visant a democratiser le sport en France et de son decret d'application du 22 juin 2022, la Federation Francaise d'Athletisme, sur avis de sa Commission medicale, a decide de remplacer l'exigence de fourniture d'un certificat medical d'absence de contre-indication, par un parcours educatif et d'information sur les risques lies a la sante dans la pratique de l'athletisme, appele "Parcours de prevention sante" (ou "PPS"). Deja applicable a tous les licencies majeurs de la FFA depuis septembre 2023, cette obligation vient s'appliquer aujourd'hui a tous les pratiquants majeurs souhaitant s'inscrire a une course qui devront ainsi satisfaire au Parcours de Prevention Sante dans les trois mois avant la manifestation concernee. Ce PPS sera disponible sur la plateforme en ligne de la FFA.</li>
                <li><strong className="text-[var(--color-text-primary)]">Pieces :</strong> certificat medical (&lt; 12 mois) ou licence FFA/FFCO/FFTri + piece d'identite + acceptation reglement.</li>
                <li><strong className="text-[var(--color-text-primary)]">Cloture :</strong> [date] ou epuisement dossards.</li>
                <li><strong className="text-[var(--color-text-primary)]">Cloture des inscriptions :</strong> 31 mars 2026.</li>
                <li><strong className="text-[var(--color-text-primary)]">Pieces obligatoires :</strong> le bulletin d'engagement officiel dument complete et signe, le parcours prevention sante ou copie de votre licence sportive en cours de validite, et le paiement des droits d'engagement a regler par cheque a l'ordre de "" ou par virement bancaire.</li>
                <li><strong className="text-[var(--color-text-primary)]">Limite :</strong> [xx] coureurs.</li>
              </ul>
            </Article>

            <Article number="4" title="Tarifs et paiement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Tarif plein :</strong> [xxx EUR] jusqu'au [date].</li>
                <li><strong className="text-[var(--color-text-primary)]">Tarif tardif :</strong> [xxx EUR] apres [date].</li>
                <li><strong className="text-[var(--color-text-primary)]">Options :</strong> tente [xx EUR], camping-car [xx EUR], repas [xx EUR].</li>
                <li><strong className="text-[var(--color-text-primary)]">Paiement :</strong> virement IBAN [FR..] ref "6J Ardeche – NOM Prenom".</li>
                <li><strong className="text-[var(--color-text-primary)]">Tarifs :</strong> se referer a la grille tarifaire.</li>
                <li><strong className="text-[var(--color-text-primary)]">Cloture des inscriptions :</strong> 31 mars 2026.</li>
                <li><strong className="text-[var(--color-text-primary)]">Inscription complete :</strong> une inscription validee par l'organisation sera consideree comme complete si elle comporte l'ensemble des pieces suivantes : le bulletin d'engagement officiel dument complete et signe, le parcours prevention sante ou copie de votre licence sportive en cours de validite, et le paiement des droits d'engagement a regler par cheque a l'ordre de "" ou par virement bancaire.</li>
                <li><strong className="text-[var(--color-text-primary)]">Coordonnees bancaires :</strong> </li>
                <li><strong className="text-[var(--color-text-primary)]">Effet :</strong> l'inscription prendra effet a la date de la reception de tous les elements du dossier COMPLET, les places reservees en bungalow seront prises en compte UNIQUEMENT avec un dossier COMPLET.</li>
                <li><strong className="text-[var(--color-text-primary)]">Envoi :</strong> </li>
              </ul>
            </Article>

            <Article number="5" title="Annulation et transfert">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">J-60 :</strong> remboursement 80%.</li>
                <li><strong className="text-[var(--color-text-primary)]">J-59 a J-30 :</strong> 50%.</li>
                <li><strong className="text-[var(--color-text-primary)]">J-29 a J-15 :</strong> 25%.</li>
                <li><strong className="text-[var(--color-text-primary)]">&lt; J-15 :</strong> aucun.</li>
                <li><strong className="text-[var(--color-text-primary)]">Transfert :</strong> autorise jusqu'a J-15, frais [xx EUR].</li>
              </ul>
            </Article>

            <Article number="6" title="Assurance et responsabilite">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">RC organisateur :</strong> assuree.</li>
                <li><strong className="text-[var(--color-text-primary)]">Individuelle :</strong> fortement recommandee (accident + rapatriement).</li>
                <li><strong className="text-[var(--color-text-primary)]">Decharge :</strong> participation = acceptation des risques.</li>
              </ul>
            </Article>

            <Article number="7" title="Dossards et materiel">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Retrait :</strong> sur presentation piece d'identite.</li>
                <li><strong className="text-[var(--color-text-primary)]">Port :</strong> visible en permanence, puce non alteree.</li>
                <li><strong className="text-[var(--color-text-primary)]">Materiel :</strong> lampe frontale, vetements meteo, gobelet, telephone charge.</li>
                <li><strong className="text-[var(--color-text-primary)]">Interdits :</strong> ecouteurs double oreille, animaux, velos.</li>
              </ul>
            </Article>

            <Article number="8" title="Chronometrage et classement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Systeme :</strong> puce electronique + comptage manuel.</li>
                <li><strong className="text-[var(--color-text-primary)]">Chronometreur :</strong> le chronometrage sera effectue par un chronometreur agre, JMG Chrono, utilisant un systeme de chronometrage electronique (puce electronique a la cheville).</li>
                <li><strong className="text-[var(--color-text-primary)]">Puce :</strong> tous les inscrits se verront remettre 1 puce electronique a la cheville. La puce electronique devra etre remise a l'organisation a l'arrivee. Un concurrent n'empruntant pas l'ensemble du trace de l'epreuve ne pourra pas etre classe a l'arrivee.</li>
                <li><strong className="text-[var(--color-text-primary)]">Abandon :</strong> en cas d'abandon, la puce devra imperativement etre remise a l'organisation a l'arrivee de la course par chaque concurrent.</li>
                <li><strong className="text-[var(--color-text-primary)]">ATTENTION :</strong> toute puce non recuperee a la fin du 6 jours sera facturee 50 euros et entrainera la disqualification immediate de l'epreuve.</li>
                <li><strong className="text-[var(--color-text-primary)]">Suivi :</strong> la societe propose aux participants un suivi tour par tour ainsi qu'un systeme de messagerie personnalisee sur le telephone portable. Pas de message personnel edite sur papier.</li>
                <li><strong className="text-[var(--color-text-primary)]">Mesure :</strong> distance totale en 144h.</li>
                <li><strong className="text-[var(--color-text-primary)]">Categories :</strong> scratch H/F + tranches d'age.</li>
              </ul>
            </Article>

            <Article number="9" title="Ravitaillement et repas">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Inclus :</strong> eau, isotoniques, cafe/the, fruits, sale.</li>
                <li><strong className="text-[var(--color-text-primary)]">Repas :</strong> petit-dej, dejeuner, diner (sur inscription).</li>
                <li><strong className="text-[var(--color-text-primary)]">Allergies :</strong> signalement obligatoire a l'inscription.</li>
              </ul>
            </Article>

            <Article number="10" title="Hebergement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Options :</strong> tente, camping-car, zone repos.</li>
                <li><strong className="text-[var(--color-text-primary)]">Electricite :</strong> limitee, priorite medicale.</li>
                <li><strong className="text-[var(--color-text-primary)]">Douches/WC :</strong> 24h/24.</li>
              </ul>
            </Article>

            <Article number="11" title="Assistance">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Zone :</strong> assistance uniquement dans zone dediee.</li>
                <li><strong className="text-[var(--color-text-primary)]">Depot :</strong> emplacement numerote par dossard.</li>
              </ul>
            </Article>

            <Article number="12" title="Securite et medical">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Poste :</strong> 24h/24, infirmier + medecin d'astreinte.</li>
                <li><strong className="text-[var(--color-text-primary)]">Retrait medical :</strong> possible pour raison de sante.</li>
                <li><strong className="text-[var(--color-text-primary)]">Kines :</strong> presents sur creneaux.</li>
              </ul>
            </Article>

            <Article number="13" title="Regles sportives">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Couloirs :</strong> a respecter, depassements courtois.</li>
                <li><strong className="text-[var(--color-text-primary)]">Marche :</strong> autorisee.</li>
                <li><strong className="text-[var(--color-text-primary)]">Dopage :</strong> tolerance zero.</li>
              </ul>
            </Article>

            <Article number="14" title="Comportement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Tenue :</strong> adaptee, dossard visible.</li>
                <li><strong className="text-[var(--color-text-primary)]">Respect :</strong> benevoles, officiels, concurrents.</li>
                <li><strong className="text-[var(--color-text-primary)]">Proprete :</strong> tri selectif, interdiction de jeter.</li>
              </ul>
            </Article>

            <Article number="15" title="Penalites">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Dechet :</strong> +1 tour neutralise.</li>
                <li><strong className="text-[var(--color-text-primary)]">Assistance illicite :</strong> -1 boucle.</li>
                <li><strong className="text-[var(--color-text-primary)]">Disqualification :</strong> dopage, fraude, comportement dangereux.</li>
              </ul>
            </Article>

            <Article number="16" title="Jury">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Composition :</strong> directeur, chrono, medical, coureur.</li>
                <li><strong className="text-[var(--color-text-primary)]">Reclamations :</strong> dans l'heure, par ecrit.</li>
              </ul>
            </Article>

            <Article number="17" title="Environnement">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Bruit :</strong> limitation nocturne.</li>
                <li><strong className="text-[var(--color-text-primary)]">Lumieres :</strong> frontales vers le sol.</li>
              </ul>
            </Article>

            <Article number="18" title="Annulation organisateur">
              <p className="pb-2">Report prioritaire ou remboursement partiel apres deduction des frais. Aucun dedommagement indirect (transport, hebergement).</p>
            </Article>

            <Article number="19" title="Droit a l'image">
              <p className="pb-2">Autorisation d'utilisation image/vido pour 5 ans. Opposition ecrite possible.</p>
            </Article>

            <Article number="20" title="Acceptation">
              <p className="pb-2">L'inscription vaut acceptation pleine et entiere du reglement. Ajustements possibles jusqu'au depart.</p>
            </Article>
          </div>

          <div className="mt-8 text-center">
            <Link to="/inscription" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display text-base md:text-lg transition-all hover:scale-105 hover:shadow-lg bg-[var(--color-race-yellow)] text-[var(--color-stencil)]">
              S'INSCRIRE MAINTENANT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
