import { useState, useEffect } from "react"
import { FileArrowDown } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { pdf } from "@react-pdf/renderer"
import { useAuthStore } from "@/stores/authStore"
import { fetchCompanyById } from "@/features/companies/api"
import { fetchContactById } from "@/features/contacts/api"
import { fetchHotelsByIds } from "@/features/hotels/api"
import { fetchStaysByIds } from "@/features/stays/api"
import { StaySelectionModal, type ModalStay } from "./StaySelectionModal"
import { ReactPDFDocument } from "./ReactPDFDocument"
import { fileStorage, type UploadedFile } from "@/lib/file-storage"

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

interface DownloadPDFButtonProps {
  bookingData: BookingData
  staySummaries: ModalStay[]
  documents?: UploadedFile[]
  isDirty?: boolean
}

function normalizePdfStay(stay: any): PDFStay {
  const normalizeAmountField = (val: any): string | undefined => {
    if (!val) return undefined
    if (typeof val === "string") return val
    if (typeof val === "object" && val.amount != null) return String(val.amount)
    return String(val)
  }
  const normalizeCurrencyField = (val: any): string | undefined => {
    if (!val) return undefined
    if (typeof val === "string") return val
    if (typeof val === "object" && val.currency != null) return String(val.currency)
    return undefined
  }
  return {
    ...stay,
    roomPrice: normalizeAmountField(stay.roomPrice),
    roomCurrency: normalizeCurrencyField(stay.roomCurrency) ?? normalizeCurrencyField(stay.roomPrice),
    taxAmount: normalizeAmountField(stay.taxAmount),
    taxCurrency: normalizeCurrencyField(stay.taxCurrency) ?? normalizeCurrencyField(stay.taxAmount),
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

async function uploadPDFToDocuments(
  blob: Blob,
  filename: string,
  bookingId: string,
  existingDocuments: UploadedFile[]
): Promise<void> {
  try {
    const file = new File([blob], filename, { type: "application/pdf" })
    const uploaded = await fileStorage.upload(file)

    const updatedDocuments = [...existingDocuments, uploaded]

    const response = await fetch(`/api/v1/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ documents: updatedDocuments }),
    })

    if (!response.ok) {
      console.error("[pdf] Failed to patch booking documents:", await response.text())
    }
  } catch (err) {
    console.error("[pdf] Error uploading PDF to documents:", err)
  }
}

export function DownloadPDFButton({
  bookingData,
  staySummaries,
  documents = [],
  isDirty,
}: DownloadPDFButtonProps) {
  const { user } = useAuthStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [companyData, setCompanyData] = useState<any>(null)
  const [bookerData, setBookerData] = useState<any>(null)

  useEffect(() => {
    if (bookingData.companyId) {
      fetchCompanyById(bookingData.companyId)
        .then((c) => setCompanyData(c))
        .catch(() => setCompanyData(null))
    } else {
      setCompanyData(null)
    }
  }, [bookingData.companyId])

  useEffect(() => {
    if (bookingData.bookerId) {
      fetchContactById(bookingData.bookerId)
        .then((c) => setBookerData(c))
        .catch(() => setBookerData(null))
    } else {
      setBookerData(null)
    }
  }, [bookingData.bookerId])

  const handleGeneratePDF = async (selectedSummaries: ModalStay[]) => {
    setIsGenerating(true)
    setShowModal(false)

    try {
      // Fetch full stay documents
      const fullStays = await fetchStaysByIds(selectedSummaries.map((s) => s._id))

      // Fetch hotel details for all unique hotel IDs
      const hotelIds = [...new Set(
        fullStays
          .map((s: any) => {
            const id = s.hotelId
            if (!id) return null
            return typeof id === "object" ? (id as any).$oid : String(id)
          })
          .filter(Boolean) as string[]
      )]

      const hotels = hotelIds.length > 0 ? await fetchHotelsByIds(hotelIds) : []
      const hotelsMap = new Map<string, any>()
      hotels.forEach((h: any) => {
        const id = typeof h._id === "object" ? (h._id as any).$oid : String(h._id)
        hotelsMap.set(id, h)
      })

      // Attach hotel address details and resolve guest names
      const preparedStays: PDFStay[] = await Promise.all(
        fullStays.map(async (stay: any) => {
          const stayId =
            typeof stay.hotelId === "object"
              ? (stay.hotelId as any).$oid
              : stay.hotelId
            ? String(stay.hotelId)
            : undefined

          const hotel = stayId ? hotelsMap.get(stayId) : undefined

          // Build guest names from guestIds
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
      const logoUrl = new URL("/cmp_logo.png", window.location.origin).href
      const userName = user?.name || "CMP Team"

      const blob = await pdf(
        <ReactPDFDocument
          bookingData={bookingData}
          stays={sorted}
          companyData={companyData}
          bookerData={bookerData}
          userName={userName}
          logoUrl={logoUrl}
        />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = window.document.createElement("a")
      const filename = `confirmation_${bookingData.confirmationNo || bookingData._id}.pdf`
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)

      // Upload to Vercel Blob and save to booking documents (fire-and-forget)
      uploadPDFToDocuments(blob, filename, bookingData._id, documents)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowModal(true)}
          disabled={isGenerating || isDirty}
          type="button"
        >
          <FileArrowDown className="size-4 mr-2" />
          {isGenerating ? "Generating…" : "Confirmation PDF"}
        </Button>
        {isDirty && (
          <p className="text-xs text-muted-foreground">
            Save changes before downloading
          </p>
        )}
      </div>

      <StaySelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        stays={staySummaries}
        onGeneratePDF={handleGeneratePDF}
        isGenerating={isGenerating}
      />
    </>
  )
}
