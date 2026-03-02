import { pdf } from "@react-pdf/renderer"
import { createElement } from "react"
import { fetchCompanyById } from "@/features/companies/api"
import { fetchContactById } from "@/features/contacts/api"
import { fetchHotelsByIds } from "@/features/hotels/api"
import { fetchStaysByIds } from "@/features/stays/api"
import { ReactPDFDocument } from "./ReactPDFDocument"
import type { ModalStay } from "./StaySelectionModal"

interface BookingData {
  _id: string
  confirmationNo?: string
  confirmationDate?: string
  travelPeriodStart?: string
  travelPeriodEnd?: string
  costCentre?: string
  notes?: string
  companyId?: string
  bookerId?: string
  stayIds?: string[]
  confirmationEntity?: string
}

interface PDFStay {
  _id: string
  checkInDate?: string
  checkOutDate?: string
  hotelName?: string
  hotelId?: string
  hotelAddress?: string
  hotelPostcode?: string
  hotelCity?: string
  hotelCountry?: string
  roomType?: string
  roomNumber?: string
  roomPrice?: string
  roomCurrency?: string
  paymentType?: string
  taxAmount?: string
  taxCurrency?: string
  reference?: string
  guestIds?: string[]
  guestNames?: string[]
  specialRequests?: string
  remarks?: string
  paymentInstructions?: string
  cancellations?: string
  confirmationNo?: string
  hotelConfirmationNo?: string
}

function normalizeAmountField(val: any): string | undefined {
  if (!val) return undefined
  if (typeof val === "string") return val
  if (typeof val === "object" && val.amount != null) return String(val.amount)
  return String(val)
}

function normalizeCurrencyField(val: any): string | undefined {
  if (!val) return undefined
  if (typeof val === "string") return val
  if (typeof val === "object" && val.currency != null) return String(val.currency)
  return undefined
}

function normalizePdfStay(stay: any): PDFStay {
  return {
    ...stay,
    roomPrice: normalizeAmountField(stay.roomPrice),
    roomCurrency:
      normalizeCurrencyField(stay.roomCurrency) ?? normalizeCurrencyField(stay.roomPrice),
    taxAmount: normalizeAmountField(stay.taxAmount),
    taxCurrency:
      normalizeCurrencyField(stay.taxCurrency) ?? normalizeCurrencyField(stay.taxAmount),
  }
}

function sortStaysByCheckInDate(stays: PDFStay[]): PDFStay[] {
  return [...stays].sort((a, b) => {
    if (!a.checkInDate && !b.checkInDate) return 0
    if (!a.checkInDate) return 1
    if (!b.checkInDate) return -1
    return new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()
  })
}

export async function generateConfirmationPDFBlob(
  bookingData: BookingData,
  selectedSummaries: ModalStay[],
  companyData: any,
  bookerData: any,
  userName: string,
  logoUrl: string,
): Promise<{ blob: Blob; filename: string }> {
  const fullStays = await fetchStaysByIds(selectedSummaries.map((s) => s._id))

  const hotelIds = [
    ...new Set(
      fullStays
        .map((s: any) => {
          const id = s.hotelId
          if (!id) return null
          return typeof id === "object" ? (id as any).$oid : String(id)
        })
        .filter(Boolean) as string[]
    ),
  ]

  const hotels = hotelIds.length > 0 ? await fetchHotelsByIds(hotelIds) : []
  const hotelsMap = new Map<string, any>()
  hotels.forEach((h: any) => {
    const id = typeof h._id === "object" ? (h._id as any).$oid : String(h._id)
    hotelsMap.set(id, h)
  })

  const preparedStays: PDFStay[] = await Promise.all(
    fullStays.map(async (stay: any) => {
      const stayId =
        typeof stay.hotelId === "object"
          ? (stay.hotelId as any).$oid
          : stay.hotelId
          ? String(stay.hotelId)
          : undefined

      const hotel = stayId ? hotelsMap.get(stayId) : undefined

      const guestNames: string[] = []
      if (stay.guestIds && stay.guestIds.length > 0) {
        for (const guestId of stay.guestIds) {
          try {
            const contact = await fetchContactById(String(guestId))
            if (contact) {
              const firstName = (contact as any).general?.firstName || ""
              const lastName = (contact as any).general?.lastName || ""
              const fullName = `${firstName} ${lastName}`.trim()
              if (fullName) guestNames.push(fullName)
            }
          } catch {
            // skip unresolvable guest
          }
        }
      }

      const enriched = {
        ...stay,
        hotelAddress: hotel?.address ?? stay.hotelAddress,
        hotelPostcode: hotel?.postal_code ?? stay.hotelPostcode,
        hotelCity: hotel?.city ?? stay.hotelCity,
        hotelCountry: hotel?.country ?? stay.hotelCountry,
        guestNames,
      }

      return normalizePdfStay(enriched)
    })
  )

  const sorted = sortStaysByCheckInDate(preparedStays)

  const blob = await pdf(
    createElement(ReactPDFDocument, {
      bookingData,
      stays: sorted,
      companyData,
      bookerData,
      userName,
      logoUrl,
    })
  ).toBlob()

  const filename = `confirmation_${bookingData.confirmationNo || bookingData._id}.pdf`
  return { blob, filename }
}

export async function generateConfirmationPDFBase64(
  bookingData: BookingData,
  selectedSummaries: ModalStay[],
  companyData: any,
  bookerData: any,
  userName: string,
  logoUrl: string,
): Promise<{ base64: string; filename: string }> {
  const { blob, filename } = await generateConfirmationPDFBlob(
    bookingData,
    selectedSummaries,
    companyData,
    bookerData,
    userName,
    logoUrl,
  )

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      // dataUrl is "data:application/pdf;base64,<base64data>"
      const base64 = dataUrl.split(",")[1]
      resolve({ base64, filename })
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
