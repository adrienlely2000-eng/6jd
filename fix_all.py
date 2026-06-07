# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

def read_file(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except UnicodeDecodeError:
        with open(path, 'r', encoding='latin-1') as f:
            return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# ============ 1. HEROSECTION.TSX ============
c = read_file('src/sections/HeroSection.tsx')

# Image de fond propre
c = c.replace('src="/images/hero-runners-road.jpg"', 'src="/images/hero-bg-clean.jpg"')

# Enlever TOUS les scaleX(-1)
c = c.replace("                transform: 'scaleX(-1)',\n", "")

# Enlever les classes d'animation
c = c.replace(' className="absolute will-change-transform runner-run-left"', ' className="absolute will-change-transform"')
c = c.replace(' className="absolute will-change-transform runner-run-right"', ' className="absolute will-change-transform"')

# Femme : petite
c = c.replace(
    "              width: 'clamp(300px, 42vw, 550px)',",
    "              width: 'clamp(100px, 14vw, 180px)',"
)
# Homme : petit
c = c.replace(
    "              width: 'clamp(320px, 46vw, 600px)',",
    "              width: 'clamp(110px, 16vw, 200px)',"
)

write_file('src/sections/HeroSection.tsx', c)
print("✅ HeroSection OK")

# ============ 2. INSCRIPTIONPAGE.TSX ============
c = read_file('src/pages/InscriptionPage.tsx')

# Imports
if 'Phone,' not in c:
    c = c.replace('  LogOut,\n} from \'lucide-react\';', '  LogOut,\n  Phone,\n  Mail,\n} from \'lucide-react\';')

# State
old_state = """  const [formData, setFormData] = useState({
    nom: '',
    parcours: parcoursOptions[1],
    categorie: categorieOptions[2],
    club: '',
  });"""
new_state = """  const [formData, setFormData] = useState({
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
  });"""
c = c.replace(old_state, new_state)

# Submit
old_submit = """    addParticipant({
      nom: formData.nom.trim().toUpperCase(),
      parcours: formData.parcours,
      categorie: formData.categorie,
      club: formData.club.trim().toUpperCase() || '-',
    });"""
new_submit = """    addParticipant({
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
    });"""
c = c.replace(old_submit, new_submit)

# Reset
old_reset = "    setFormData({ nom: '', parcours: parcoursOptions[1], categorie: categorieOptions[2], club: '' });"
new_reset = "    setFormData({ nom: '', parcours: parcoursOptions[1], categorie: categorieOptions[2], club: '', typeCourse: 'Course', dateNaissance: '', adresse: '', telephone: '', sexe: '', email: '', tailleMaillot: 'M' });"
c = c.replace(old_reset, new_reset)

# Nouveaux champs
new_fields = """                {/* Course ou Marche */}
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

"""

c = c.replace(
    '                <button\n                  type="submit"\n                  className="w-full py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:brightness-110"',
    new_fields + '                <button\n                  type="submit"\n                  className="w-full py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:brightness-110"'
)

write_file('src/pages/InscriptionPage.tsx', c)
print("✅ InscriptionPage OK")
