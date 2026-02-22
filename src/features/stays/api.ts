import type { Stay } from '@ruben/admin-template-config/entities/types'

const isServer = typeof window === 'undefined'
const origin = isServer ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') : ''
const BASE = `${origin}/api/v1/stays`

export async function fetchStayById(id: string): Promise<Stay | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) return null
  const json = await res.json()
  return json.data as Stay
}

export async function fetchStaysByIds(ids: string[]): Promise<Array<Stay>> {
  if (ids.length === 0) return []
  const res = await fetch(`${BASE}/by-ids?ids=${ids.map(encodeURIComponent).join(',')}`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Stay>
}

export async function fetchStaysByHotelId(hotelId: string): Promise<Array<Stay>> {
  const res = await fetch(`${BASE}?hotelId=${encodeURIComponent(hotelId)}&pageSize=1000`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data.data as Array<Stay>
}

export async function fetchStaysByGuestId(guestId: string): Promise<Array<Stay>> {
  const res = await fetch(`${BASE}?guestIds=${encodeURIComponent(guestId)}&pageSize=1000`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data.data as Array<Stay>
}

export async function searchStays(query: string): Promise<Array<Stay>> {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&limit=10`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Stay>
}

export interface StayQueryParams {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
}

export interface StayQueryResponse {
  data: Array<Stay>
  pageCount: number
  totalRows: number
}

export async function fetchStays(params: StayQueryParams): Promise<StayQueryResponse> {
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
  if (!res.ok) throw new Error(`Failed to fetch stays: ${res.status}`)
  const json = await res.json()
  const { data, pagination } = json.data
  return {
    data,
    pageCount: pagination.totalPages,
    totalRows: pagination.totalItems,
  }
}
