import fs from 'fs'
import path from 'path'
import pg from 'pg'

const { Pool } = pg

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'participants.json')

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  : null

const schemaReady = pool ? ensureSchema() : Promise.resolve()

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS participants (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      parcours TEXT NOT NULL,
      categorie TEXT NOT NULL,
      club TEXT NOT NULL,
      type_course TEXT NOT NULL,
      date_naissance TEXT NOT NULL,
      adresse TEXT NOT NULL,
      telephone TEXT NOT NULL,
      sexe TEXT NOT NULL,
      email TEXT NOT NULL,
      taille_maillot TEXT NOT NULL,
      created_at BIGINT NOT NULL
    );
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)
  console.log('[DB] PostgreSQL schema ready')
}

function rowToParticipant(row) {
  return {
    id: row.id,
    nom: row.nom,
    parcours: row.parcours,
    categorie: row.categorie,
    club: row.club,
    typeCourse: row.type_course,
    dateNaissance: row.date_naissance,
    adresse: row.adresse,
    telephone: row.telephone,
    sexe: row.sexe,
    email: row.email,
    tailleMaillot: row.taille_maillot,
    createdAt: Number(row.created_at),
  }
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8')
  }
}

function readParticipantsFromFile() {
  ensureDataFile()
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writeParticipantsToFile(list) {
  ensureDataFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8')
}

async function migrateFileToDatabase() {
  const fileParticipants = readParticipantsFromFile()
  if (fileParticipants.length === 0) return

  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM participants')
  if (rows[0].count > 0) return

  console.log(`[DB] Migration de ${fileParticipants.length} inscription(s) depuis le fichier local`)
  for (const participant of fileParticipants) {
    await insertParticipant(participant)
  }
}

async function insertParticipant(participant) {
  await pool.query(
    `INSERT INTO participants (
      id, nom, parcours, categorie, club, type_course,
      date_naissance, adresse, telephone, sexe, email, taille_maillot, created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    ON CONFLICT (id) DO NOTHING`,
    [
      participant.id,
      participant.nom,
      participant.parcours,
      participant.categorie,
      participant.club,
      participant.typeCourse,
      participant.dateNaissance,
      participant.adresse,
      participant.telephone,
      participant.sexe,
      participant.email,
      participant.tailleMaillot,
      participant.createdAt,
    ]
  )
}

export function usesDatabase() {
  return Boolean(pool)
}

export async function initStorage() {
  if (pool) {
    await schemaReady
    await migrateFileToDatabase()
    return
  }
  ensureDataFile()
  console.log('[DB] Fichier local (data/participants.json) — ajoutez DATABASE_URL en production')
}

export async function getParticipants() {
  if (pool) {
    await schemaReady
    const { rows } = await pool.query('SELECT * FROM participants ORDER BY created_at ASC')
    return rows.map(rowToParticipant)
  }
  return readParticipantsFromFile().sort((a, b) => a.createdAt - b.createdAt)
}

export async function addParticipant(participant) {
  if (pool) {
    await schemaReady
    await insertParticipant(participant)
    return participant
  }

  const list = readParticipantsFromFile()
  list.push(participant)
  writeParticipantsToFile(list)
  return participant
}

export async function deleteParticipant(id) {
  if (pool) {
    await schemaReady
    const result = await pool.query('DELETE FROM participants WHERE id = $1 RETURNING id', [id])
    return result.rowCount > 0
  }

  const list = readParticipantsFromFile()
  const next = list.filter((p) => p.id !== id)
  if (next.length === list.length) return false
  writeParticipantsToFile(next)
  return true
}

export async function findAdminByUsername(username) {
  if (!pool) return null
  await schemaReady
  const { rows } = await pool.query('SELECT id, username, password_hash FROM admins WHERE username = $1', [username])
  return rows[0] || null
}

export async function createAdminUser(username, passwordHash) {
  if (!pool) {
    throw new Error('DATABASE_URL requis pour creer un admin')
  }
  await schemaReady
  const result = await pool.query(
    'INSERT INTO admins (username, password_hash) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING RETURNING id',
    [username, passwordHash]
  )
  if (result.rowCount === 0) {
    throw new Error('Ce nom d\'utilisateur existe deja')
  }
}
