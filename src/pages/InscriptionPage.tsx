import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, UserPlus, Trash2, Users, Award,
  Calendar, MapPin, Timer, Lock, Unlock, Shield, LogOut,
  Loader2
} from 'lucide-react'
import { useParticipants, useAdmin } from '../hooks/useParticipants'

const parcoursOptions = ["6 Jours de l'Infini 2027"]

const categorieOptions = [
  'Master 3',
  'Master 4',
  'Master 5',
  'Master 6',
  'Senior',
  'Veteran',
]

const tailleOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

type FormData = {
  nom: string
  parcours: string
  categorie: string
  club: string
  typeCourse: string
  dateNaissance: string
  adresse: string
  telephone: string
  sexe: string
  email: string
  tailleMaillot: string
}

type FieldErrors = Partial<Record<keyof FormData, string>>

function validateForm(data: FormData): FieldErrors {
  const errors: FieldErrors = {}

  if (!data.nom.trim()) {
    errors.nom = 'Le nom est obligatoire'
  }
  if (!data.club.trim()) {
    errors.club = 'Le club est obligatoire'
  }
  if (!data.dateNaissance) {
    errors.dateNaissance = 'La date de naissance est obligatoire'
  }
  if (!data.adresse.trim()) {
    errors.adresse = 'L\'adresse est obligatoire'
  }
  if (!data.telephone.trim()) {
    errors.telephone = 'Le telephone est obligatoire'
  } else if (data.telephone.replace(/\D/g, '').length < 10) {
    errors.telephone = 'Numero de telephone invalide'
  }
  if (!data.email.trim()) {
    errors.email = 'L\'email est obligatoire'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Adresse email invalide'
  }

  return errors
}

function isFormComplete(data: FormData) {
  return Object.keys(validateForm(data)).length === 0
}

function formatDate(date: string) {
  if (!date) return '-'
  const [year, month, day] = date.split('-')
  if (!year || !month || !day) return date
  return `${day}/${month}/${year}`
}

function ParticipantField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-2 text-[12px] leading-relaxed">
      <span className="text-[10px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--color-gold-muted)' }}>
        {label}
      </span>
      <span className="break-words" style={{ color: 'var(--color-ash)' }}>
        {value || '-'}
      </span>
    </div>
  )
}

export default function InscriptionPage() {
  const navigate = useNavigate()
  const { participants, isLoading, error, addParticipant, deleteParticipant } = useParticipants()
  const { isAdmin, adminUsername: currentAdmin, login, logout, createAdmin } = useAdmin()

  const [formData, setFormData] = useState({
    nom: '',
    parcours: parcoursOptions[0],
    categorie: categorieOptions[0],
    club: '',
    typeCourse: 'Course',
    dateNaissance: '',
    adresse: '',
    telephone: '',
    sexe: 'M',
    email: '',
    tailleMaillot: 'M',
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState(false)
  const [newAdminUsername, setNewAdminUsername] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [createAdminMessage, setCreateAdminMessage] = useState<string | null>(null)
  const [createAdminError, setCreateAdminError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const openDatePicker = useCallback(() => {
    const input = dateInputRef.current
    if (!input) return
    input.focus()
    if ('showPicker' in input && typeof input.showPicker === 'function') {
      try {
        input.showPicker()
      } catch {
        // showPicker requires a user gesture; ignore if blocked
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm(formData)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await addParticipant({
        nom: formData.nom.trim().toUpperCase(),
        parcours: formData.parcours,
        categorie: formData.categorie,
        club: formData.club.trim().toUpperCase(),
        typeCourse: formData.typeCourse,
        dateNaissance: formData.dateNaissance,
        adresse: formData.adresse.trim(),
        telephone: formData.telephone.trim(),
        sexe: formData.sexe,
        email: formData.email.trim(),
        tailleMaillot: formData.tailleMaillot,
      })

      setFormData({
        nom: '', parcours: parcoursOptions[0], categorie: categorieOptions[0],
        club: '', typeCourse: 'Course', dateNaissance: '', adresse: '',
        telephone: '', sexe: 'M', email: '', tailleMaillot: 'M',
      })
      setFieldErrors({})
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Impossible d\'enregistrer l\'inscription')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminError(false)
    const success = await login(adminUsername, adminPassword)
    if (success) {
      setShowAdminLogin(false)
      setAdminUsername('')
      setAdminPassword('')
    } else {
      setAdminError(true)
    }
  }

  const inputStyle = {
    background: 'var(--color-obsidian)',
    border: '1px solid rgba(240,235,225,0.1)',
    borderRadius: '6px',
    color: 'var(--color-parchment)',
    padding: '10px 14px',
    fontSize: '13px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  const labelStyle = 'block text-[11px] font-medium uppercase tracking-[0.08em] mb-1.5'

  const canSubmit = isFormComplete(formData)

  const fieldInputStyle = (field: keyof FormData) => {
    const hasError =
      !!fieldErrors[field] ||
      (!!formData[field] && !!validateForm(formData)[field])

    return {
      ...inputStyle,
      border: hasError
        ? '1px solid var(--color-ember)'
        : '1px solid rgba(240,235,225,0.1)',
    }
  }

  const fieldError = (field: keyof FormData) => {
    const message =
      fieldErrors[field] ??
      (formData[field] && validateForm(formData)[field] ? validateForm(formData)[field] : undefined)

    return message ? (
      <p className="mt-1 text-[11px]" style={{ color: 'var(--color-ember)' }}>
        {message}
      </p>
    ) : null
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-obsidian)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(240,235,225,0.06)',
        }}
      >
        <div className="content-container flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[13px] font-medium transition-colors duration-300 hover:text-[var(--color-gold)]"
            style={{ color: 'var(--color-ash)' }}
          >
            <ArrowLeft size={16} />
            <span>Retour</span>
          </button>
          <span className="font-display text-xl tracking-tight cursor-pointer" onClick={() => navigate('/')} style={{ color: 'var(--color-gold)' }}>
            6JI
          </span>
          <div className="flex items-center gap-2">
            <Users size={16} style={{ color: 'var(--color-gold)' }} />
            <span className="text-[13px] font-mono-data" style={{ color: 'var(--color-ash)' }}>
              {isLoading ? '...' : participants.length}
            </span>
          </div>
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
        <div className="content-container py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="section-label mb-3">&mdash; INSCRIPTIONS 2027</p>
              <h1 className="font-display text-3xl md:text-5xl uppercase mb-3" style={{ color: 'var(--color-parchment)' }}>
                LISTE DES <span style={{ color: 'var(--color-gold)' }}>INSCRITS</span>
              </h1>
              <p className="text-base max-w-lg" style={{ color: 'var(--color-ash)' }}>
                Les inscriptions pour l'edition 2027 sont ouvertes. Le nombre de participants est limite pour garantir la securite de l'evenement.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Calendar, text: '24-30 Avril 2027' },
                { icon: MapPin, text: 'Vidauban, Var' },
                { icon: Timer, text: '144h Non-Stop' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-4 py-2 rounded"
                  style={{
                    background: 'rgba(200,165,92,0.08)',
                    border: '1px solid rgba(200,165,92,0.2)',
                  }}
                >
                  <Icon size={14} style={{ color: 'var(--color-gold)' }} />
                  <span className="text-[11px] font-medium" style={{ color: 'var(--color-gold)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-container py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-12">
          {/* Form Column */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            {/* Admin Panel */}
            {isAdmin ? (
              <div
                className="p-5 rounded-lg"
                style={{ background: 'rgba(200,165,92,0.05)', border: '1px solid rgba(200,165,92,0.2)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield size={16} style={{ color: 'var(--color-gold)' }} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em]" style={{ color: 'var(--color-gold)' }}>
                      Mode Administrateur
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-[11px] transition-colors duration-300 hover:text-[var(--color-ember)]"
                    style={{ color: 'var(--color-ash)' }}
                  >
                    <LogOut size={12} />
                    Deconnexion
                  </button>
                </div>
                <p className="text-[11px] mb-3" style={{ color: 'var(--color-ash)' }}>
                  Connecte en tant que <strong style={{ color: 'var(--color-parchment)' }}>{currentAdmin}</strong>. Vous pouvez supprimer des participants.
                </p>

                <div className="pt-3 mt-3" style={{ borderTop: '1px solid rgba(240,235,225,0.08)' }}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--color-gold-muted)' }}>
                    Creer un autre admin
                  </p>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setCreateAdminMessage(null)
                      setCreateAdminError(null)
                      try {
                        await createAdmin(newAdminUsername, newAdminPassword)
                        setCreateAdminMessage(`Admin "${newAdminUsername}" cree avec succes`)
                        setNewAdminUsername('')
                        setNewAdminPassword('')
                      } catch (err) {
                        setCreateAdminError(err instanceof Error ? err.message : 'Erreur lors de la creation')
                      }
                    }}
                    className="space-y-2"
                  >
                    <input
                      type="text"
                      value={newAdminUsername}
                      onChange={(e) => setNewAdminUsername(e.target.value)}
                      placeholder="Identifiant"
                      className="w-full px-3 py-2 text-[12px] outline-none rounded"
                      style={{ ...inputStyle }}
                    />
                    <input
                      type="password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      placeholder="Mot de passe (min 6 caracteres)"
                      className="w-full px-3 py-2 text-[12px] outline-none rounded"
                      style={{ ...inputStyle }}
                    />
                    {createAdminError && (
                      <p className="text-[11px]" style={{ color: 'var(--color-ember)' }}>{createAdminError}</p>
                    )}
                    {createAdminMessage && (
                      <p className="text-[11px]" style={{ color: 'var(--color-gold)' }}>{createAdminMessage}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-2 text-[11px] font-bold uppercase tracking-[0.08em] rounded transition-all duration-200 hover:brightness-110"
                      style={{ background: 'var(--color-gold)', color: 'var(--color-obsidian)' }}
                    >
                      Ajouter l'admin
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div
                className="p-4 flex items-center justify-between rounded-lg"
                style={{ background: 'var(--color-ink)', border: '1px solid rgba(240,235,225,0.06)' }}
              >
                <div className="flex items-center gap-2">
                  <Lock size={14} style={{ color: 'var(--color-ash)' }} />
                  <span className="text-[11px]" style={{ color: 'var(--color-ash)' }}>
                    Mode administrateur desactive
                  </span>
                </div>
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="flex items-center gap-1 text-[11px] font-medium transition-colors duration-300 hover:text-[var(--color-gold)]"
                  style={{ color: 'var(--color-ash)' }}
                >
                  <Unlock size={12} />
                  Activer
                </button>
              </div>
            )}

            {/* Admin Login Modal */}
            {showAdminLogin && (
              <div
                className="p-5 rounded-lg"
                style={{ background: 'var(--color-ink)', border: '1px solid rgba(200,165,92,0.3)' }}
              >
                <p className="text-[13px] font-medium mb-3" style={{ color: 'var(--color-parchment)' }}>
                  Connexion administrateur
                </p>
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => { setAdminUsername(e.target.value); setAdminError(false) }}
                    placeholder="Nom d'utilisateur"
                    className="w-full px-4 py-2 text-[13px] outline-none rounded"
                    style={{ ...inputStyle }}
                  />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => { setAdminPassword(e.target.value); setAdminError(false) }}
                    placeholder="Mot de passe"
                    className="w-full px-4 py-2 text-[13px] outline-none rounded"
                    style={{ ...inputStyle }}
                  />
                  {adminError && (
                    <p className="text-[11px]" style={{ color: 'var(--color-ember)' }}>
                      Identifiants incorrects
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2 text-[12px] font-bold uppercase tracking-[0.08em] rounded transition-all duration-200 hover:brightness-110"
                    style={{ background: 'var(--color-gold)', color: 'var(--color-obsidian)' }}
                  >
                    Se connecter
                  </button>
                </form>
              </div>
            )}

            {/* Registration Form */}
            {showSuccess && (
              <div
                className="p-4 rounded-lg flex items-center gap-2"
                style={{ background: 'rgba(200,165,92,0.1)', border: '1px solid rgba(200,165,92,0.3)' }}
              >
                <Award size={16} style={{ color: 'var(--color-gold)' }} />
                <span className="text-[13px] font-medium" style={{ color: 'var(--color-gold)' }}>
                  Inscription ajoutee avec succes !
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <h3 className="font-display text-xl mb-2" style={{ color: 'var(--color-parchment)' }}>
                Nouvelle inscription
              </h3>

              <div>
                <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Nom / Prenom *</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => updateField('nom', e.target.value)}
                  placeholder="NOM Prenom"
                  className="rounded focus:border-[var(--color-gold-muted)]"
                  style={fieldInputStyle('nom')}
                />
                {fieldError('nom')}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Parcours</label>
                  <select
                    value={formData.parcours}
                    onChange={(e) => updateField('parcours', e.target.value)}
                    className="rounded"
                    style={{ ...inputStyle, appearance: 'auto' }}
                  >
                    {parcoursOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Categorie</label>
                  <select
                    value={formData.categorie}
                    onChange={(e) => updateField('categorie', e.target.value)}
                    className="rounded"
                    style={{ ...inputStyle, appearance: 'auto' }}
                  >
                    {categorieOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Club *</label>
                  <input
                    type="text"
                    value={formData.club}
                    onChange={(e) => updateField('club', e.target.value)}
                    placeholder="CLUB"
                    className="rounded"
                    style={fieldInputStyle('club')}
                  />
                  {fieldError('club')}
                </div>
                <div>
                  <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Type</label>
                  <select
                    value={formData.typeCourse}
                    onChange={(e) => updateField('typeCourse', e.target.value)}
                    className="rounded"
                    style={{ ...inputStyle, appearance: 'auto' }}
                  >
                    <option value="Course">Course</option>
                    <option value="Marche">Marche</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="dateNaissance"
                    className={`${labelStyle} cursor-pointer`}
                    style={{ color: 'var(--color-gold-muted)' }}
                    onClick={openDatePicker}
                  >
                    Date naissance *
                  </label>
                  <input
                    ref={dateInputRef}
                    id="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => updateField('dateNaissance', e.target.value)}
                    onClick={openDatePicker}
                    className="rounded date-input"
                    style={fieldInputStyle('dateNaissance')}
                  />
                  {fieldError('dateNaissance')}
                </div>
                <div>
                  <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Sexe</label>
                  <select
                    value={formData.sexe}
                    onChange={(e) => updateField('sexe', e.target.value)}
                    className="rounded"
                    style={{ ...inputStyle, appearance: 'auto' }}
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Adresse *</label>
                <input
                  type="text"
                  value={formData.adresse}
                  onChange={(e) => updateField('adresse', e.target.value)}
                  placeholder="Adresse complete"
                  className="rounded"
                  style={fieldInputStyle('adresse')}
                />
                {fieldError('adresse')}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Telephone *</label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => updateField('telephone', e.target.value)}
                    placeholder="06 XX XX XX XX"
                    className="rounded"
                    style={fieldInputStyle('telephone')}
                  />
                  {fieldError('telephone')}
                </div>
                <div>
                  <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Taille maillot</label>
                  <select
                    value={formData.tailleMaillot}
                    onChange={(e) => updateField('tailleMaillot', e.target.value)}
                    className="rounded"
                    style={{ ...inputStyle, appearance: 'auto' }}
                  >
                    {tailleOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelStyle} style={{ color: 'var(--color-gold-muted)' }}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="email@exemple.com"
                  className="rounded"
                  style={fieldInputStyle('email')}
                />
                {fieldError('email')}
              </div>

              {!canSubmit && (
                <p className="text-[11px]" style={{ color: 'var(--color-ash)' }}>
                  Remplissez tous les champs obligatoires (*) pour valider l'inscription.
                </p>
              )}

              {submitError && (
                <p className="text-[11px]" style={{ color: 'var(--color-ember)' }}>
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full py-3 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] rounded transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:brightness-110"
                style={{ background: 'var(--color-gold)', color: 'var(--color-obsidian)' }}
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                {isSubmitting ? 'Enregistrement...' : 'Ajouter l\'inscription'}
              </button>
            </form>
          </div>

          {/* Table Column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl" style={{ color: 'var(--color-parchment)' }}>
                Liste des inscrits
              </h3>
              <span
                className="px-3 py-1 text-[11px] font-medium rounded-full"
                style={{ background: 'rgba(200,165,92,0.1)', color: 'var(--color-gold)', border: '1px solid rgba(200,165,92,0.2)' }}
              >
                {participants.length} inscrit{participants.length > 1 ? 's' : ''}
              </span>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-gold)' }} />
              </div>
            ) : error ? (
              <div
                className="text-center py-16 rounded-lg"
                style={{ border: '1px solid rgba(201,74,60,0.3)', background: 'rgba(201,74,60,0.06)' }}
              >
                <p className="text-[13px] mb-2" style={{ color: 'var(--color-ember)' }}>
                  {error}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--color-ash)' }}>
                  Verifiez que le serveur est demarre (npm run dev).
                </p>
              </div>
            ) : participants.length === 0 ? (
              <div
                className="text-center py-16 rounded-lg"
                style={{ border: '2px dashed rgba(240,235,225,0.08)' }}
              >
                <Users size={32} className="mx-auto mb-3" style={{ color: 'var(--color-ash)' }} />
                <p className="text-[13px]" style={{ color: 'var(--color-ash)' }}>
                  Aucun inscrit pour le moment
                </p>
                <p className="text-[11px] mt-1" style={{ color: 'var(--color-gold-muted)' }}>
                  Soyez le premier a vous inscrire !
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                {participants.map((p, i) => (
                  <article
                    key={p.id}
                    className="p-4 rounded-lg"
                    style={{
                      background: 'var(--color-ink)',
                      border: '1px solid rgba(240,235,225,0.06)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3 pb-3" style={{ borderBottom: '1px solid rgba(240,235,225,0.06)' }}>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-mono-data uppercase tracking-[0.1em] mb-1" style={{ color: 'var(--color-gold-muted)' }}>
                          Inscrit #{i + 1}
                        </span>
                        <h4 className="font-display text-lg leading-tight break-words" style={{ color: 'var(--color-parchment)' }}>
                          {p.nom}
                        </h4>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={async () => {
                            if (!confirm('Supprimer cette inscription ?')) return
                            try {
                              await deleteParticipant(p.id)
                            } catch (err) {
                              alert(err instanceof Error ? err.message : 'Suppression impossible')
                            }
                          }}
                          className="shrink-0 p-1.5 rounded transition-colors duration-200 hover:bg-[var(--color-ember-muted)]"
                          style={{ color: 'var(--color-ember)' }}
                          aria-label={`Supprimer ${p.nom}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <ParticipantField label="Parcours" value={p.parcours} />
                      <ParticipantField label="Cat." value={p.categorie} />
                      <ParticipantField label="Club" value={p.club} />
                      {isAdmin && (
                        <>
                          <ParticipantField label="Type" value={p.typeCourse} />
                          <ParticipantField label="Naissance" value={formatDate(p.dateNaissance)} />
                          <ParticipantField label="Sexe" value={p.sexe} />
                          <ParticipantField label="Adresse" value={p.adresse} />
                          <ParticipantField label="Tel" value={p.telephone} />
                          <ParticipantField label="Email" value={p.email} />
                          <ParticipantField label="Taille" value={p.tailleMaillot} />
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
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
