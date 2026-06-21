import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import { addParticipant, deleteParticipant, getParticipants, initStorage, usesDatabase } from './db.js'
import { registerAdmin, requireAdmin, signAdminToken, verifyAdmin } from './admin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.join(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const PORT = Number(process.env.PORT) || 3001

function isValidParticipant(body) {
  return Boolean(
    body?.nom?.trim() &&
    body?.club?.trim() &&
    body?.dateNaissance &&
    body?.adresse?.trim() &&
    body?.telephone?.trim() &&
    body?.email?.trim()
  )
}

const app = express()

app.use(cors())
app.use(express.json({ limit: '64kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, storage: usesDatabase() ? 'postgresql' : 'file' })
})

app.get('/api/participants', async (_req, res, next) => {
  try {
    const participants = await getParticipants()
    res.json(participants)
  } catch (err) {
    next(err)
  }
})

app.post('/api/participants', async (req, res, next) => {
  try {
    if (!isValidParticipant(req.body)) {
      return res.status(400).json({ error: 'Donnees invalides ou incompletes' })
    }

    const participant = {
      id: crypto.randomUUID(),
      nom: req.body.nom.trim().toUpperCase(),
      parcours: req.body.parcours || "6 Jours de l'Infini 2027",
      categorie: req.body.categorie || 'Senior',
      club: req.body.club.trim().toUpperCase(),
      typeCourse: req.body.typeCourse || 'Course',
      dateNaissance: req.body.dateNaissance,
      adresse: req.body.adresse.trim(),
      telephone: req.body.telephone.trim(),
      sexe: req.body.sexe || 'M',
      email: req.body.email.trim(),
      tailleMaillot: req.body.tailleMaillot || 'M',
      createdAt: Date.now(),
    }

    await addParticipant(participant)
    res.status(201).json(participant)
  } catch (err) {
    next(err)
  }
})

app.delete('/api/participants/:id', requireAdmin, async (req, res, next) => {
  try {
    const deleted = await deleteParticipant(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Inscription introuvable' })
    }

    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

app.post('/api/admin/login', async (req, res, next) => {
  try {
    const { username, password } = req.body || {}
    const admin = await verifyAdmin(username, password)

    if (!admin) {
      return res.status(401).json({ error: 'Identifiants incorrects' })
    }

    res.json({
      ok: true,
      token: signAdminToken(admin),
      username: admin.username,
    })
  } catch (err) {
    next(err)
  }
})

app.post('/api/admin/create', requireAdmin, async (req, res, next) => {
  try {
    const { username, password } = req.body || {}

    if (!usesDatabase()) {
      return res.status(400).json({ error: 'DATABASE_URL requis pour creer un admin' })
    }

    await registerAdmin(username, password)
    res.status(201).json({ ok: true, message: `Admin ${username.trim()} cree` })
  } catch (err) {
    if (err instanceof Error && (err.message.includes('requis') || err.message.includes('min'))) {
      return res.status(400).json({ error: err.message })
    }
    next(err)
  }
})

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))

  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next()
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'), (err) => {
      if (err) next(err)
    })
  })
}

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err, _req, res, _next) => {
  console.error('[API]', err)
  res.status(500).json({ error: 'Erreur serveur' })
})

initStorage()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`6JI server running on port ${PORT} (${usesDatabase() ? 'PostgreSQL' : 'fichier local'})`)
    })
  })
  .catch((err) => {
    console.error('[DB] Init failed:', err)
    process.exit(1)
  })
