import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT_DIR, 'data')
const DATA_FILE = path.join(DATA_DIR, 'participants.json')
const DIST_DIR = path.join(ROOT_DIR, 'dist')

const ADMIN_USER = process.env.ADMIN_USER || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '6ji2027'
const PORT = Number(process.env.PORT) || 3001

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8')
  }
}

function readParticipants() {
  ensureDataFile()
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writeParticipants(list) {
  ensureDataFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8')
}

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

function isAdminAuthorized(req) {
  const password = req.headers['x-admin-password']
  return password === ADMIN_PASSWORD
}

const app = express()

app.use(cors())
app.use(express.json({ limit: '64kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/participants', (_req, res) => {
  const participants = readParticipants().sort((a, b) => a.createdAt - b.createdAt)
  res.json(participants)
})

app.post('/api/participants', (req, res) => {
  if (!isValidParticipant(req.body)) {
    return res.status(400).json({ error: 'Donnees invalides ou incompletes' })
  }

  const participants = readParticipants()
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

  participants.push(participant)
  writeParticipants(participants)
  res.status(201).json(participant)
})

app.delete('/api/participants/:id', (req, res) => {
  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Non autorise' })
  }

  const participants = readParticipants()
  const next = participants.filter((p) => p.id !== req.params.id)

  if (next.length === participants.length) {
    return res.status(404).json({ error: 'Inscription introuvable' })
  }

  writeParticipants(next)
  res.json({ ok: true })
})

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {}

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    return res.json({ ok: true })
  }

  res.status(401).json({ error: 'Identifiants incorrects' })
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

app.listen(PORT, () => {
  ensureDataFile()
  console.log(`6JI server running on port ${PORT}`)
})
