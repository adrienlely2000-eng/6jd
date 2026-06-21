import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createAdminUser, findAdminByUsername, usesDatabase } from './db.js'

const ADMIN_USER = process.env.ADMIN_USER || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '6ji2027'

function getJwtSecret() {
  const secret = process.env.APP_SECRET || process.env.JWT_SECRET
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('APP_SECRET manquant en production')
  }
  return secret || 'dev-insecure-secret'
}

export async function verifyAdmin(username, password) {
  if (!username || !password) return null

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    return { id: 0, username: ADMIN_USER, isFallback: true }
  }

  if (usesDatabase()) {
    const row = await findAdminByUsername(username)
    if (row) {
      const valid = await bcrypt.compare(password, row.password_hash)
      if (valid) {
        return { id: row.id, username: row.username }
      }
      return null
    }
  }

  return null
}

export async function registerAdmin(username, plainPassword) {
  if (!username?.trim() || !plainPassword || plainPassword.length < 6) {
    throw new Error('Username et mot de passe (min 6 caracteres) requis')
  }

  const hash = await bcrypt.hash(plainPassword, 12)
  await createAdminUser(username.trim(), hash)
}

export function signAdminToken(admin) {
  return jwt.sign(
    {
      id: admin.id,
      username: admin.username,
      role: 'admin',
      isSuperAdmin: Boolean(admin.isFallback),
    },
    getJwtSecret(),
    { expiresIn: '24h' }
  )
}

export function requireAdmin(req, res, next) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' })
  }

  try {
    const token = auth.slice(7)
    const decoded = jwt.verify(token, getJwtSecret())
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Acces refuse' })
    }
    req.admin = decoded
    next()
  } catch {
    return res.status(403).json({ error: 'Session expiree ou invalide' })
  }
}

export function requireSuperAdmin(req, res, next) {
  requireAdmin(req, res, () => {
    if (!req.admin?.isSuperAdmin) {
      return res.status(403).json({ error: 'Reserve au superadmin' })
    }
    next()
  })
}
