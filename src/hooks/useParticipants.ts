import { useState, useCallback, useEffect } from 'react'
import { apiDelete, apiGet, apiPost } from '../lib/api'

export interface Participant {
  id: string
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
  createdAt: number
}

const ADMIN_TOKEN_KEY = '6ji_admin_token'
const ADMIN_USERNAME_KEY = '6ji_admin_username'
const ADMIN_SUPER_KEY = '6ji_admin_super'

export interface AdminAccount {
  id: number
  username: string
  createdAt: string
}

function getAdminHeaders(): HeadersInit {
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY)
  if (!token) {
    throw new Error('Session administrateur expiree')
  }
  return { Authorization: `Bearer ${token}` }
}

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshParticipants = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const list = await apiGet<Participant[]>('/participants')
      setParticipants(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les inscrits')
      setParticipants([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshParticipants()
  }, [refreshParticipants])

  useEffect(() => {
    const onFocus = () => refreshParticipants()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [refreshParticipants])

  const addParticipant = useCallback(async (data: Omit<Participant, 'id' | 'createdAt'>) => {
    const newParticipant = await apiPost<Participant>('/participants', data)
    setParticipants((prev) => [...prev, newParticipant])
    return newParticipant
  }, [])

  const deleteParticipant = useCallback(async (id: string) => {
    await apiDelete(`/participants/${id}`, getAdminHeaders())
    setParticipants((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return { participants, isLoading, error, addParticipant, deleteParticipant, refreshParticipants }
}

type LoginResponse = {
  ok: true
  token: string
  username: string
  isSuperAdmin: boolean
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return !!sessionStorage.getItem(ADMIN_TOKEN_KEY)
  })
  const [adminUsername, setAdminUsername] = useState(
    () => sessionStorage.getItem(ADMIN_USERNAME_KEY) || ''
  )
  const [isSuperAdmin, setIsSuperAdmin] = useState(
    () => sessionStorage.getItem(ADMIN_SUPER_KEY) === '1'
  )

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await apiPost<LoginResponse>('/admin/login', { username, password })
      sessionStorage.setItem(ADMIN_TOKEN_KEY, result.token)
      sessionStorage.setItem(ADMIN_USERNAME_KEY, result.username)
      sessionStorage.setItem(ADMIN_SUPER_KEY, result.isSuperAdmin ? '1' : '0')
      setAdminUsername(result.username)
      setIsSuperAdmin(result.isSuperAdmin)
      setIsAdmin(true)
      return true
    } catch {
      return false
    }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
    sessionStorage.removeItem(ADMIN_USERNAME_KEY)
    sessionStorage.removeItem(ADMIN_SUPER_KEY)
    setAdminUsername('')
    setIsSuperAdmin(false)
    setIsAdmin(false)
  }, [])

  const createAdmin = useCallback(async (username: string, password: string) => {
    await apiPost('/admin/create', { username, password }, getAdminHeaders())
  }, [])

  const listAdmins = useCallback(async () => {
    return apiGet<AdminAccount[]>('/admin/users', getAdminHeaders())
  }, [])

  const deleteAdmin = useCallback(async (id: number) => {
    await apiDelete(`/admin/users/${id}`, getAdminHeaders())
  }, [])

  return { isAdmin, isSuperAdmin, adminUsername, login, logout, createAdmin, listAdmins, deleteAdmin }
}
