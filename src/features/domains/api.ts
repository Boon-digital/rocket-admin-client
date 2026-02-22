import type { Domain } from '@boon-digital/rocket-admin-config/entities/types'

const isServer = typeof window === 'undefined'
const origin = isServer ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') : ''
const BASE = `${origin}/api/v1/domains`

export async function fetchDomainById(id: string): Promise<Domain | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) return null
  const json = await res.json()
  return json.data as Domain
}

export async function searchDomains(query: string): Promise<Array<Domain>> {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&limit=10`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Domain>
}
