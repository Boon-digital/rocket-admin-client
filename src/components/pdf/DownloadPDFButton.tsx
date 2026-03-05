import { useState, useEffect } from "react"
import { FileArrowDown } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"
import { fetchCompanyById } from "@/features/companies/api"
import { fetchContactById } from "@/features/contacts/api"
import { StaySelectionModal, type ModalStay } from "./StaySelectionModal"
import { generateConfirmationPDFBlob } from "./generatePDF"
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
  documents?: unknown[]
  isDirty?: boolean
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
          {isGenerating ? "Generating…" : "Download"}
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
        mode="download"
      />
    </>
  )
}
