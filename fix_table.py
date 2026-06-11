# -*- coding: utf-8 -*-
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

c = read_file('src/pages/InscriptionPage.tsx')

# 1. THEAD — colonnes supplémentaires pour admin
old_thead = """                        {['Nom', 'Parcours', 'Catégorie', 'Club / Association'].map((h) => (
                          <th key={h} className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                        ))}
                        {isAdmin && <th className="w-16"></th>}"""

new_thead = """                        {['Nom', 'Parcours', 'Catégorie', 'Club / Association'].map((h) => (
                          <th key={h} className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                        ))}
                        {isAdmin && (
                          <>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Course/Marche</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Né(e) le</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Sexe</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Adresse</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Téléphone</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Email</th>
                            <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Taille</th>
                            <th className="w-16"></th>
                          </>
                        )}"""

c = c.replace(old_thead, new_thead)
print("✅ Thead OK")

# 2. TBODY — cellules admin après Club
old_tbody = """                          <td className="px-6 py-4">
                            <span className="text-sm font-mono-data" style={{ color: 'var(--color-text-secondary)' }}>{p.club}</span>
                          </td>
                          {isAdmin && (
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
                          )}"""

new_tbody = """                          <td className="px-6 py-4">
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
                          )}"""

c = c.replace(old_tbody, new_tbody)
print("✅ Tbody OK")

write_file('src/pages/InscriptionPage.tsx', c)
print("✅ Fichier sauvegardé")
