import type { Contact } from '@ruben/admin-template-config/entities/types'

const isServer = typeof window === 'undefined'
const origin = isServer ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') : ''
const BASE = `${origin}/api/v1/contacts`

export async function fetchContactById(id: string): Promise<Contact | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) return null
  const json = await res.json()
  return json.data as Contact
}

export async function fetchContactsByCompanyId(companyId: string): Promise<Array<Contact>> {
  const res = await fetch(`${BASE}?general.companyId=${encodeURIComponent(companyId)}&pageSize=1000`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data.data as Array<Contact>
}

export async function searchContacts(query: string): Promise<Array<Contact>> {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&limit=10`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Contact>
}

export interface ContactQueryParams {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
}

export interface ContactQueryResponse {
  data: Array<Contact>
  pageCount: number
  totalRows: number
}

export async function fetchContacts(params: ContactQueryParams): Promise<ContactQueryResponse> {
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

  const res = await fetch(`${BASE}?${qs}`)
  if (!res.ok) throw new Error(`Failed to fetch contacts: ${res.status}`)
  const json = await res.json()
  const { data, pagination } = json.data
  return {
    data,
    pageCount: pagination.totalPages,
    totalRows: pagination.totalItems,
  }
}
