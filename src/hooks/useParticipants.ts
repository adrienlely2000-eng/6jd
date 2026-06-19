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

const ADMIN_KEY = '6ji_admin_token'
const ADMIN_PASSWORD_KEY = '6ji_admin_password'

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

  const addParticipant = useCallback(async (data: Omit<Participant, 'id' | 'createdAt'>) => {
    const newParticipant = await apiPost<Participant>('/participants', data)
    setParticipants((prev) => [...prev, newParticipant])
    return newParticipant
  }, [])

  const deleteParticipant = useCallback(async (id: string) => {
    const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY)
    if (!password) {
      throw new Error('Session administrateur expiree')
    }

    await apiDelete(`/participants/${id}`, {
      'X-Admin-Password': password,
    })
    setParticipants((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return { participants, isLoading, error, addParticipant, deleteParticipant, refreshParticipants }
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return !!sessionStorage.getItem(ADMIN_KEY)
  })

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      await apiPost('/admin/login', { username, password })
      sessionStorage.setItem(ADMIN_KEY, 'authenticated')
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, password)
      setIsAdmin(true)
      return true
    } catch {
      return false
    }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_KEY)
    sessionStorage.removeItem(ADMIN_PASSWORD_KEY)
    setIsAdmin(false)
  }, [])

  return { isAdmin, login, logout }
}
