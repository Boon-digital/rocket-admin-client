import { entityRegistry, type EntityKey } from '@boon-digital/rocket-admin-config/registry'
import type { BaseEntity } from '@boon-digital/rocket-admin-config/entities/types'

// In the browser, use relative URLs (proxied by Vite in dev, same origin in prod).
// During SSR, use the absolute API URL since there's no proxy.
function apiBase(path: string): string {
  const isServer = typeof window === 'undefined'
  const origin = isServer ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') : ''
  return `${origin}${path}`
}

export interface EntityQueryParams {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
  dateFilters?: Record<string, { from: string; to: string }>
}

export interface EntityQueryResponse<T> {
  data: Array<T>
  pageCount: number
  totalRows: number
}

export function makeEntityApi<T extends BaseEntity>(entityKey: EntityKey) {
  const entry = entityRegistry[entityKey]
  const PATH = `/api/v1${entry.route}`

  async function fetchById(id: string): Promise<T | null> {
    const res = await fetch(apiBase(`${PATH}/${id}`))
    if (!res.ok) return null
    const json = await res.json()
    return json.data as T
  }

  async function search(query: string): Promise<Array<T>> {
    const res = await fetch(apiBase(`${PATH}/search?q=${encodeURIComponent(query)}&limit=10`))
    if (!res.ok) return []
    const json = await res.json()
    return json.data as Array<T>
  }

  async function create(data: Omit<T, '_id'>): Promise<T> {
    const res = await fetch(apiBase(PATH), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`Failed to create ${entityKey}: ${res.status}`)
    const json = await res.json()
    return json.data as T
  }

  async function update(id: string, data: Partial<T>): Promise<T> {
    const { _id, ...body } = data as any
    const res = await fetch(apiBase(`${PATH}/${id}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Failed to update ${entityKey}: ${res.status}`)
    const json = await res.json()
    return json.data as T
  }

  async function remove(id: string): Promise<void> {
    const res = await fetch(apiBase(`${PATH}/${id}`), {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!res.ok) throw new Error(`Failed to delete ${entityKey}: ${res.status}`)
  }

  async function fetchAll(params: EntityQueryParams): Promise<EntityQueryResponse<T>> {
    const qs = new URLSearchParams({
      page: String(params.page + 1),
      pageSize: String(params.pageSize),
    })
    if (params.search) qs.set('search', params.search)
    if (params.sortBy) qs.set('sortBy', params.sortBy)
    if (params.sortOrder) qs.set('sortOrder', params.sortOrder)
    if (params.filters) {
      for (const [key, value] of Object.entries(params.filters)) {
        qs.set(key, value)
      }
    }
    if (params.dateFilters) {
      for (const [key, range] of Object.entries(params.dateFilters)) {
        qs.set(`${key}[from]`, range.from)
        qs.set(`${key}[to]`, range.to)
      }
    }

    const res = await fetch(apiBase(`${PATH}?${qs}`))
    if (!res.ok) throw new Error(`Failed to fetch ${entityKey}: ${res.status}`)
    const json = await res.json()
    const { data, pagination } = json.data
    return {
      data,
      pageCount: pagination.totalPages,
      totalRows: pagination.totalItems,
    }
  }

  return { fetchById, search, fetchAll, create, update, remove }
}
