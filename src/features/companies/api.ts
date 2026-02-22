import type { Company } from '@ruben/admin-template-config/entities/types'

const isServer = typeof window === 'undefined'
const origin = isServer ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') : ''
const BASE = `${origin}/api/v1/companies`

export async function fetchCompanyById(id: string): Promise<Company | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) return null
  const json = await res.json()
  return json.data as Company
}

export async function searchCompanies(query: string): Promise<Array<Company>> {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&limit=10`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Company>
}

export interface CompanyQueryParams {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
}

export interface CompanyQueryResponse {
  data: Array<Company>
  pageCount: number
  totalRows: number
}

export async function fetchCompanies(params: CompanyQueryParams): Promise<CompanyQueryResponse> {
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
  if (!res.ok) throw new Error(`Failed to fetch companies: ${res.status}`)
  const json = await res.json()
  const { data, pagination } = json.data
  return {
    data,
    pageCount: pagination.totalPages,
    totalRows: pagination.totalItems,
  }
}
