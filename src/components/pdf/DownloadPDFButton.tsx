import { useState, useEffect } from "react"
import { FileArrowDown } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"
import { fetchCompanyById } from "@/features/companies/api"
import { fetchContactById } from "@/features/contacts/api"
import { StaySelectionModal, type ModalStay } from "./StaySelectionModal"
import { generateConfirmationPDFBlob } from "./generatePDF"
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

interface DownloadPDFButtonProps {
  bookingData: BookingData
  staySummaries: ModalStay[]
  documents?: UploadedFile[]
  isDirty?: boolean
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
      const logoUrl = new URL("/cmp_logo.png", window.location.origin).href
      const userName = user?.name || "CMP Team"

      const { blob, filename } = await generateConfirmationPDFBlob(
        bookingData,
        selectedSummaries,
        companyData,
        bookerData,
        userName,
        logoUrl,
      )

      const url = URL.createObjectURL(blob)
      const link = window.document.createElement("a")
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
