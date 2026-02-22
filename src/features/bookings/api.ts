import type { Booking } from '@boon-digital/rocket-admin-config/entities/types'

const isServer = typeof window === 'undefined'
const origin = isServer ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') : ''
const BASE = `${origin}/api/v1/bookings`

export async function fetchBookingById(id: string): Promise<Booking | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) return null
  const json = await res.json()
  return json.data as Booking
}

export async function fetchBookingsByIds(ids: string[]): Promise<Array<Booking>> {
  if (ids.length === 0) return []
  const res = await fetch(`${BASE}/by-ids?ids=${ids.map(encodeURIComponent).join(',')}`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Booking>
}

export async function fetchBookingsByCompanyId(companyId: string): Promise<Array<Booking>> {
  const res = await fetch(`${BASE}?companyId=${encodeURIComponent(companyId)}&pageSize=1000`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data.data as Array<Booking>
}

export async function searchBookings(query: string): Promise<Array<Booking>> {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&limit=10`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data as Array<Booking>
}

export interface BookingQueryParams {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
}

export interface BookingQueryResponse {
  data: Array<Booking>
  pageCount: number
  totalRows: number
}

export async function fetchBookings(params: BookingQueryParams): Promise<BookingQueryResponse> {
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
  if (!res.ok) throw new Error(`Failed to fetch bookings: ${res.status}`)
  const json = await res.json()
  const { data, pagination } = json.data
  return {
    data,
    pageCount: pagination.totalPages,
    totalRows: pagination.totalItems,
  }
}
