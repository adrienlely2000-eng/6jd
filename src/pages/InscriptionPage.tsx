import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  UserPlus,
  Trash2,
  Users,
  Route,
  Award,
  Building2,
  Calendar,
  MapPin,
  Timer,
  Lock,
  Unlock,
  Shield,
  LogOut,
  Phone,
  Mail,
} from 'lucide-react';
import { useParticipants, useAdmin } from '../hooks/useParticipants';

const parcoursOptions = [
  '6 Jours de France 2026',
  '6 Jours de France 2027',
  '144h Non-Stop',
  '24h',
  '48h',
];

const categorieOptions = [
  'Master 3',
  'Master 4',
  'Master 5',
  'Master 6',
  'Senior',
  'Vétéran',
];

export default function InscriptionPage() {
  const navigate = useNavigate();
  const { participants, isLoading, addParticipant, deleteParticipant } = useParticipants();
  const { isAdmin, login, logout } = useAdmin();

  const [formData, setFormData] = useState({
    nom: '',
    parcours: parcoursOptions[1],
    categorie: categorieOptions[2],
    club: '',
    typeCourse: 'Course',
    dateNaissance: '',
    adresse: '',
    telephone: '',
    sexe: '',
    email: '',
    tailleMaillot: 'M',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom.trim()) return;

    addParticipant({
      nom: formData.nom.trim().toUpperCase(),
      parcours: formData.parcours,
      categorie: formData.categorie,
      club: formData.club.trim().toUpperCase() || '-',
      typeCourse: formData.typeCourse,
      dateNaissance: formData.dateNaissance,
      adresse: formData.adresse,
      telephone: formData.telephone,
      sexe: formData.sexe,
      email: formData.email,
      tailleMaillot: formData.tailleMaillot,
    });

    setFormData({ nom: '', parcours: parcoursOptions[1], categorie: categorieOptions[2], club: '', typeCourse: 'Course', dateNaissance: '', adresse: '', telephone: '', sexe: '', email: '', tailleMaillot: 'M' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(false);
    const success = await login(adminUsername, adminPassword);
    if (success) {
      setShowAdminLogin(false);
      setAdminUsername('');
      setAdminPassword('');
    } else {
      setAdminError(true);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-dark)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(18,18,18,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="content-container flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-race-yellow"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeft size={18} />
            <span>Retour</span>
          </button>

          <span
            className="font-display text-xl tracking-tight cursor-pointer"
            onClick={() => navigate('/')}
            style={{ color: 'var(--color-race-yellow)' }}
          >
            6JDA
          </span>

          <div className="flex items-center gap-3">
            <Users size={16} style={{ color: 'var(--color-race-yellow)' }} />
            <span className="text-sm font-mono-data" style={{ color: 'var(--color-text-secondary)' }}>
              {isLoading ? '...' : participants.length}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="content-container py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="section-label mb-3">— INSCRIPTIONS 2027</p>
              <h1 className="font-display text-3xl md:text-5xl uppercase mb-3" style={{ color: 'var(--color-text-primary)' }}>
                LISTE DES <span style={{ color: 'var(--color-race-yellow)' }}>INSCRITS</span>
              </h1>
              <p className="text-base max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
                Les inscriptions pour l'édition 2027 sont ouvertes. Le nombre de participants est limité pour garantir la sécurité de l'événement.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Calendar, text: '24-30 Avril 2027' },
                { icon: MapPin, text: 'Privas, Ard&egrave;che' },
                { icon: Timer, text: '144h Non-Stop' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-4 py-2"
                  style={{
                    background: 'rgba(255,229,0,0.08)',
                    border: '1px solid rgba(255,229,0,0.2)',
                    borderRadius: 'var(--border-radius-sm)',
                  }}
                >
                  <Icon size={16} style={{ color: 'var(--color-race-yellow)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--color-race-yellow)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="content-container py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12">
          {/* Form Column */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            {/* Admin Panel */}
            {isAdmin ? (
              <div
                className="p-5"
                style={{
                  background: 'rgba(255,229,0,0.05)',
                  border: '1px solid rgba(255,229,0,0.2)',
                  borderRadius: 'var(--border-radius-lg)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield size={18} style={{ color: 'var(--color-race-yellow)' }} />
                    <span className="text-sm font-bold uppercase" style={{ color: 'var(--color-race-yellow)' }}>
                      Mode Administrateur
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-xs transition-colors duration-200 hover:text-race-red"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <LogOut size={14} />
                    Déconnexion
                  </button>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Vous pouvez maintenant supprimer des participants du tableau.
                </p>
              </div>
            ) : (
              <div
                className="p-4 flex items-center justify-between"
                style={{
                  background: 'var(--color-surface-card)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 'var(--border-radius-lg)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Lock size={16} style={{ color: 'var(--color-text-muted)' }} />
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    Mode administrateur désactivé
                  </span>
                </div>
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="flex items-center gap-1 text-xs font-medium transition-colors duration-200 hover:text-race-yellow"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Unlock size={14} />
                  Activer
                </button>
              </div>
            )}

            {/* Admin Login Modal */}
            {showAdminLogin && (
              <div
                className="p-5"
                style={{
                  background: 'var(--color-surface-card)',
                  border: '1px solid rgba(255,229,0,0.3)',
                  borderRadius: 'var(--border-radius-lg)',
                }}
              >
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  Connexion administrateur
                </p>
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => { setAdminUsername(e.target.value); setAdminError(false); }}
                    placeholder="Nom d'utilisateur"
                    className="w-full px-4 py-2 text-sm outline-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => { setAdminPassword(e.target.value); setAdminError(false); }}
                    placeholder="Mot de passe"
                    className="w-full px-4 py-2 text-sm outline-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: `1px solid ${adminError ? 'var(--color-race-red)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  {adminError && (
                    <p className="text-xs" style={{ color: 'var(--color-race-red)' }}>Identifiants incorrects.</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-bold uppercase transition-all duration-200 hover:brightness-110"
                      style={{
                        background: 'var(--color-race-yellow)',
                        color: 'var(--color-stencil)',
                        borderRadius: 'var(--border-radius-sm)',
                      }}
                    >
                      Connexion
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowAdminLogin(false); setAdminUsername(''); setAdminPassword(''); setAdminError(false); }}
                      className="px-4 py-2 text-xs font-medium"
                      style={{
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--color-text-secondary)',
                        borderRadius: 'var(--border-radius-sm)',
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Inscription Form */}
            <div
              className="p-6 md:p-8"
              style={{
                background: 'var(--color-surface-card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 'var(--border-radius-lg)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2" style={{ background: 'rgba(255,229,0,0.1)', borderRadius: 'var(--border-radius-sm)' }}>
                  <UserPlus size={20} style={{ color: 'var(--color-race-yellow)' }} />
                </div>
                <h2 className="font-display text-xl uppercase" style={{ color: 'var(--color-text-primary)' }}>
                  Nouvel Inscrit
                </h2>
              </div>

              {showSuccess && (
                <div
                  className="mb-4 p-3 text-sm font-medium text-center"
                  style={{
                    background: 'rgba(255,229,0,0.1)',
                    color: 'var(--color-race-yellow)',
                    borderRadius: 'var(--border-radius-sm)',
                  }}
                >
                  ✓ Inscription ajoutée avec succès !
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Users size={14} /> Nom / Prénom
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="NOM Prénom"
                    required
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Route size={14} /> Parcours
                  </label>
                  <select
                    value={formData.parcours}
                    onChange={(e) => setFormData({ ...formData, parcours: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none appearance-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {parcoursOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Award size={14} /> Catégorie
                  </label>
                  <select
                    value={formData.categorie}
                    onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none appearance-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {categorieOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Building2 size={14} /> Club / Association
                  </label>
                  <input
                    type="text"
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    placeholder="Nom du club (optionnel)"
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>

                {/* Course ou Marche */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Route size={14} /> Course ou Marche
                  </label>
                  <select
                    value={formData.typeCourse}
                    onChange={(e) => setFormData({ ...formData, typeCourse: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none appearance-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <option value="Course">Course</option>
                    <option value="Marche">Marche</option>
                  </select>
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Calendar size={14} /> Date de naissance
                  </label>
                  <input
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                    required
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                      colorScheme: 'dark',
                    }}
                  />
                </div>

                {/* Sexe */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Users size={14} /> Sexe
                  </label>
                  <select
                    value={formData.sexe}
                    onChange={(e) => setFormData({ ...formData, sexe: e.target.value })}
                    required
                    className="w-full px-4 py-3 text-sm outline-none appearance-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <option value="">-- Selectionner --</option>
                    <option value="M">Masculin</option>
                    <option value="F">Feminin</option>
                  </select>
                </div>

                {/* Adresse */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <MapPin size={14} /> Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    placeholder="Adresse postale complete"
                    required
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>

                {/* Telephone */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Phone size={14} /> Telephone
                  </label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    required
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Mail size={14} /> Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemple.com"
                    required
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>

                {/* Taille maillot */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Award size={14} /> Taille maillot
                  </label>
                  <select
                    value={formData.tailleMaillot}
                    onChange={(e) => setFormData({ ...formData, tailleMaillot: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none appearance-none"
                    style={{
                      background: 'var(--color-surface-dark)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--border-radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:brightness-110"
                  style={{
                    background: 'var(--color-race-yellow)',
                    color: 'var(--color-stencil)',
                    borderRadius: 'var(--border-radius-sm)',
                  }}
                >
                  Ajouter l'inscription
                </button>
              </form>
            </div>
          </div>

          {/* Table Column */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl uppercase" style={{ color: 'var(--color-text-primary)' }}>
                Participants <span style={{ color: 'var(--color-race-yellow)' }}>({participants.length})</span>
              </h2>
            </div>

            {isLoading ? (
              <div className="text-center py-16" style={{ color: 'var(--color-text-muted)' }}>
                Chargement des participants...
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div
                  className="hidden md:block overflow-hidden"
                  style={{
                    background: 'var(--color-surface-card)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 'var(--border-radius-lg)',
                  }}
                >
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['Nom', 'Parcours', 'Catégorie', 'Club / Association'].map((h) => (
                          <th key={h} className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                        ))}
                        {isAdmin && (
                          <>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Course/Marche</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Né(e) le</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Sexe</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Adresse</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>T&eacute;l&eacute;phone</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Email</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Taille</th>
                            <th className="w-16"></th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((p, index) => (
                        <tr
                          key={p.id}
                          className="transition-colors duration-150 hover:bg-white/5"
                          style={{ borderBottom: index < participants.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                        >
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{p.nom}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.parcours}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="inline-block px-3 py-1 text-xs font-medium"
                              style={{ background: 'rgba(255,229,0,0.1)', color: 'var(--color-race-yellow)', borderRadius: 'var(--border-radius-sm)' }}
                            >
                              {p.categorie}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-mono-data" style={{ color: 'var(--color-text-secondary)' }}>{p.club}</span>
                          </td>
                          {isAdmin && (
                            <>
                              <td className="px-6 py-4"><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.typeCourse || '-'}</span></td>
                              <td className="px-6 py-4"><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.dateNaissance || '-'}</span></td>
                              <td className="px-6 py-4"><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.sexe || '-'}</span></td>
                              <td className="px-6 py-4"><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.adresse || '-'}</span></td>
                              <td className="px-6 py-4"><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.telephone || '-'}</span></td>
                              <td className="px-6 py-4"><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.email || '-'}</span></td>
                              <td className="px-6 py-4"><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.tailleMaillot || '-'}</span></td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => deleteParticipant(p.id)}
                                  className="p-2 transition-colors duration-200 hover:text-race-red"
                                  style={{ color: 'var(--color-text-muted)' }}
                                  title="Supprimer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {participants.map((p) => (
                    <div
                      key={p.id}
                      className="p-4"
                      style={{
                        background: 'var(--color-surface-card)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 'var(--border-radius-md)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{p.nom}</span>
                        {isAdmin && (
                          <button
                            onClick={() => deleteParticipant(p.id)}
                            className="p-1 transition-colors duration-200 hover:text-race-red"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Parcours</span>
                          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{p.parcours}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Catégorie</span>
                          <span
                            className="px-2 py-0.5 text-xs font-medium"
                            style={{ background: 'rgba(255,229,0,0.1)', color: 'var(--color-race-yellow)', borderRadius: 'var(--border-radius-sm)' }}
                          >
                            {p.categorie}
                          </span>
                        </div>
                                                <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Club</span>
                          <span className="text-xs font-mono-data" style={{ color: 'var(--color-text-secondary)' }}>{p.club}</span>
                        </div>
                        {isAdmin && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Course/Marche</span>
                              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{p.typeCourse || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Ne(e) le</span>
                              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{p.dateNaissance || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Sexe</span>
                              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{p.sexe || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Adresse</span>
                              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{p.adresse || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Telephone</span>
                              <a href={`tel:${p.telephone}`} className="text-xs" style={{ color: 'var(--color-race-yellow)' }}>{p.telephone || '-'}</a>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Email</span>
                              <a href={`mailto:${p.email}`} className="text-xs" style={{ color: 'var(--color-race-yellow)' }}>{p.email || '-'}</a>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Taille</span>
                              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{p.tailleMaillot || '-'}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {participants.length === 0 && (
                  <div
                    className="text-center py-16"
                    style={{
                      background: 'var(--color-surface-card)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 'var(--border-radius-lg)',
                    }}
                  >
                    <Users size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Aucun participant inscrit pour le moment.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="mt-16"
        style={{
          background: 'var(--color-stencil)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: 'var(--space-md) 0',
        }}
      >
        <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>© 2027 6 Jours d'Ard&egrave;che. Inscriptions en ligne.</p>
          <button
            onClick={() => navigate('/')}
            className="text-xs transition-colors duration-200 hover:text-race-yellow"
            style={{ color: 'var(--color-text-muted)' }}
          >
            ← Retour au site principal
          </button>
        </div>
      </footer>
    </div>
  );
}
