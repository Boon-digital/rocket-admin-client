import { useState, useEffect } from "react"
import { PaperPlaneTilt, Check } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchContactById } from "@/features/contacts/api"
import { fetchCompanyById } from "@/features/companies/api"
import { useAuthStore } from "@/stores/authStore"
import type { FieldRendererProps } from "@/features/detail-panel/types"
import { StaySelectionModal, type ModalStay } from "./StaySelectionModal"
import { generateConfirmationPDFBase64 } from "./generatePDF"

export function SendConfirmationButtonField({
  mode,
  allData,
}: FieldRendererProps) {
  if (mode !== "view" || !allData) return null

  const { user } = useAuthStore()
  const queryClient = useQueryClient()
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

  const { data: logsData } = useQuery({
    queryKey: ["email-logs", bookingId],
    queryFn: async () => {
      console.log("[email-logs] fetching for bookingId:", bookingId)
      const res = await fetch(`/api/v1/email/logs?bookingId=${bookingId}`, {
        credentials: "include",
      })
      const json = await res.json()
      console.log("[email-logs] response:", json)
      return json
    },
    enabled: !!bookingId,
  })
  const emailLogs: any[] = logsData?.data ?? []
  console.log("[email-logs] emailLogs:", emailLogs, "logsData:", logsData)

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

      toast.success("Confirmation sent.")
      // Server already patched confirmationSent + confirmationSentAt — refetch both list and detail
      await queryClient.invalidateQueries({ queryKey: ["bookings"] })
      await queryClient.invalidateQueries({ queryKey: ["bookings", "detail", bookingId] })
      await queryClient.invalidateQueries({ queryKey: ["email-logs", bookingId] })
    } catch (err: any) {
      console.error("[send-confirmation] Error:", err)
      toast.error(err?.message ?? "Failed to send confirmation email.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 pt-2">
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => setShowModal(true)}
        disabled={isSending}
        type="button"
      >
        <PaperPlaneTilt className="size-4 mr-2" />
        {isSending ? "Sending…" : "Send"}
      </Button>

      {(emailLogs.length > 0 || allData.confirmationSent) && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground font-medium">Previously sent</span>

          {emailLogs.length === 0 && allData.confirmationSent && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-3 shrink-0 text-green-600" />
              <span>Sent (date unknown)</span>
            </div>
          )}

          {emailLogs.map((log: any) => {
            const date = new Date(log.sentAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            return (
              <div
                key={log._id?.$oid ?? log._id}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Check className="size-3 shrink-0 text-green-600" />
                <span>{date}</span>
                {log.sentBy && <span className="truncate">— {log.sentBy}</span>}
              </div>
            )
          })}
        </div>
      )}

      <StaySelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        stays={staySummaries}
        onGeneratePDF={handleSend}
        isGenerating={isSending}
        mode="send"
      />
    </div>
  )
}
