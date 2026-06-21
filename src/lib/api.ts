const API_BASE = import.meta.env.VITE_API_URL || ''

async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = typeof data?.error === 'string' ? data.error : 'Erreur serveur'
    throw new Error(message)
  }
  return data as T
}

export async function apiGet<T>(path: string, headers?: HeadersInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, { headers })
  return parseResponse<T>(res)
}

export async function apiPost<T>(path: string, body?: unknown, headers?: HeadersInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return parseResponse<T>(res)
}

export async function apiDelete<T>(path: string, headers?: HeadersInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, {
    method: 'DELETE',
    headers,
  })
  return parseResponse<T>(res)
}
