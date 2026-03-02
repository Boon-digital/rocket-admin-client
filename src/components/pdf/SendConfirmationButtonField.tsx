import { useState, useEffect } from "react"
import { PaperPlaneTilt, Check } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { fetchContactById } from "@/features/contacts/api"
import { fetchCompanyById } from "@/features/companies/api"
import { useAuthStore } from "@/stores/authStore"
import type { FieldRendererProps } from "@/features/detail-panel/types"
import { StaySelectionModal, type ModalStay } from "./StaySelectionModal"
import { generateConfirmationPDFBase64 } from "./generatePDF"

export function SendConfirmationButtonField({
  mode,
  allData,
  onChange,
  onRequestSave,
}: FieldRendererProps) {
  if (mode !== "view" || !allData) return null

  const { user } = useAuthStore()
  const [isSending, setIsSending] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [bookerData, setBookerData] = useState<any>(null)
  const [companyData, setCompanyData] = useState<any>(null)

  const bookerId =
    typeof allData.bookerId === "object"
      ? (allData.bookerId as any).$oid
      : allData.bookerId

  const companyId =
    typeof allData.companyId === "object"
      ? (allData.companyId as any).$oid
      : allData.companyId

  const bookingId =
    typeof allData._id === "object" ? (allData._id as any).$oid : String(allData._id)

  useEffect(() => {
    if (!bookerId) {
      setBookerData(null)
      return
    }
    fetchContactById(bookerId)
      .then((c) => setBookerData(c))
      .catch(() => setBookerData(null))
  }, [bookerId])

  useEffect(() => {
    if (!companyId) {
      setCompanyData(null)
      return
    }
    fetchCompanyById(companyId)
      .then((c) => setCompanyData(c))
      .catch(() => setCompanyData(null))
  }, [companyId])

  const staySummaries: ModalStay[] = (allData.staySummaries ?? []).map((s: any) => ({
    _id: s.stayId,
    hotelName: s.hotelName,
    checkInDate: s.checkInDate,
    checkOutDate: s.checkOutDate,
    guestCount: s.guestNames?.length ?? 0,
  }))

  const handleSend = async (selectedSummaries: ModalStay[]) => {
    setIsSending(true)
    setShowModal(false)

    try {
      const firstName = bookerData?.general?.firstName ?? ""
      const lastName = bookerData?.general?.lastName ?? ""
      const bookerFullName = `${firstName} ${lastName}`.trim()
      const bookerEmail = bookerData?.general?.email ?? ""

      if (!bookerEmail) {
        toast.error("No email address found for the booker.")
        return
      }

      const bookingData = {
        _id: bookingId,
        confirmationNo: allData.confirmationNo,
        confirmationDate: allData.confirmationDate,
        travelPeriodStart: allData.travelPeriodStart,
        travelPeriodEnd: allData.travelPeriodEnd,
        costCentre: allData.costCentre,
        notes: allData.notes,
        companyId: allData.companyId,
        bookerId: allData.bookerId,
        confirmationEntity: allData.confirmationEntity,
      }

      const logoUrl = new URL("/cmp_logo.png", window.location.origin).href
      const userName = user?.name || "CMP Team"

      const { base64, filename } = await generateConfirmationPDFBase64(
        bookingData,
        selectedSummaries,
        companyData,
        bookerData,
        userName,
        logoUrl,
      )

      const response = await fetch("/api/v1/email/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookingId,
          to: bookerEmail,
          bookerName: bookerFullName,
          confirmationNo: allData.confirmationNo ?? "",
          staySummaries: allData.staySummaries ?? [],
          pdfBase64: base64,
          pdfFilename: filename,
          sentBy: user?.email ?? user?.name ?? "unknown",
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err?.error ?? "Failed to send email")
      }

      // Mark confirmation as sent and update status
      if (!allData.confirmationSent) {
        onChange?.("confirmationSent", true)
        if (!allData.statusManuallySet) {
          onChange?.("status", "upcoming_confirmation_sent")
        }
        const saved = await onRequestSave?.()
        if (saved) {
          toast.success("Confirmation sent and saved.")
        } else {
          toast.success("Confirmation sent.")
        }
      } else {
        toast.success("Confirmation sent.")
      }
    } catch (err: any) {
      console.error("[send-confirmation] Error:", err)
      toast.error(err?.message ?? "Failed to send confirmation email.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="pt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowModal(true)}
        disabled={isSending}
        type="button"
      >
        <PaperPlaneTilt className="size-4 mr-2" />
        {isSending ? "Sending…" : "Send Confirmation"}
      </Button>
      {allData.confirmationSent && (
        <p className="text-xs text-green-700 dark:text-green-400 mt-1 flex items-center gap-1">
          <Check className="size-3" />Confirmation sent
        </p>
      )}

      <StaySelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        stays={staySummaries}
        onGeneratePDF={handleSend}
        isGenerating={isSending}
      />
    </div>
  )
}
