import type { Hotel } from '@boon-digital/rocket-admin-config/entities/types'

const isServer = typeof window === 'undefined'
const origin = isServer ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') : ''
const BASE = `${origin}/api/v1/hotels`

export async function fetchHotelById(id: string): Promise<Hotel | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) return null
  const json = await res.json()
  return json.data as Hotel
}

export async function fetchHotelsByIds(ids: string[]): Promise<Array<Hotel>> {
  if (ids.length === 0) return []
  const res = await fetch(`${BASE}/by-ids?ids=${ids.map(encodeURIComponent).join(',')}`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Hotel>
}

export async function searchHotels(query: string): Promise<Array<Hotel>> {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&limit=10`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Hotel>
}

export interface HotelQueryParams {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
}

export interface HotelQueryResponse {
  data: Array<Hotel>
  pageCount: number
  totalRows: number
}

export async function fetchHotels(params: HotelQueryParams): Promise<HotelQueryResponse> {
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
  if (!res.ok) throw new Error(`Failed to fetch hotels: ${res.status}`)
  const json = await res.json()
  const { data, pagination } = json.data
  return {
    data,
    pageCount: pagination.totalPages,
    totalRows: pagination.totalItems,
  }
}
