import { useState, useEffect } from "react"
import { PaperPlaneTilt, Check } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchContactById } from "@/features/contacts/api"
import { fetchCompanyById } from "@/features/companies/api"
import { useAuthStore } from "@/stores/authStore"
import type { FieldRendererProps } from "@/features/detail-panel/types"
import type { ModalStay } from "./StaySelectionModal"
import { ComposeEmailDialog, type ComposeEmailValues } from "./ComposeEmailDialog"
import { generateConfirmationPDFBase64 } from "./generatePDF"

export function SendConfirmationButtonField({
  mode,
  allData,
}: FieldRendererProps) {
  if (mode !== "view" || !allData) return null

  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [isSending, setIsSending] = useState(false)
  const [showCompose, setShowCompose] = useState(false)
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
      const res = await fetch(`/api/v1/email/logs?bookingId=${bookingId}`, {
        credentials: "include",
      })
      return res.json()
    },
    enabled: !!bookingId,
  })
  const emailLogs: any[] = logsData?.data ?? []

  useEffect(() => {
    if (!bookerId) { setBookerData(null); return }
    fetchContactById(bookerId).then((c) => setBookerData(c)).catch(() => setBookerData(null))
  }, [bookerId])

  useEffect(() => {
    if (!companyId) { setCompanyData(null); return }
    fetchCompanyById(companyId).then((c) => setCompanyData(c)).catch(() => setCompanyData(null))
  }, [companyId])

  const staySummaries: ModalStay[] = (allData.staySummaries ?? []).map((s: any) => ({
    _id: s.stayId,
    hotelName: s.hotelName,
    checkInDate: s.checkInDate,
    checkOutDate: s.checkOutDate,
    guestCount: s.guestNames?.length ?? 0,
  }))

  // During testing the to field defaults to ruben@boondigital.nl.
  // Once ready for production, change this to: bookerData?.general?.email ?? ""
  const bookerEmail = "ruben@boondigital.nl"
  const firstName = bookerData?.general?.firstName ?? ""
  const lastName = bookerData?.general?.lastName ?? ""
  const bookerFullName = `${firstName} ${lastName}`.trim()

  const handleSend = async (values: ComposeEmailValues) => {
    setIsSending(true)
    setShowCompose(false)

    try {
      if (!values.to) {
        toast.error("No recipient email address specified.")
        return
      }

      // Filter stays to only the selected one
      const selectedSummaries = staySummaries.filter((s) =>
        values.selectedStayIds.includes(s._id)
      )

      if (selectedSummaries.length === 0) {
        toast.error("No stay selected.")
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

      // Parse comma-separated cc/bcc into arrays
      const parseCsv = (s: string) =>
        s.split(",").map((e) => e.trim()).filter(Boolean)

      const response = await fetch("/api/v1/email/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookingId,
          from: values.from,
          to: values.to,
          cc: parseCsv(values.cc),
          bcc: parseCsv(values.bcc),
          subject: values.subject,
          bodyText: values.bodyText,
          bookerName: bookerFullName,
          confirmationNo: allData.confirmationNo ?? "",
          staySummaries: selectedSummaries,
          pdfBase64: base64,
          pdfFilename: filename,
          sentBy: user?.email ?? user?.name ?? "unknown",
          senderName: user?.name ?? "CMP Team",
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err?.error ?? "Failed to send email")
      }

      toast.success("Confirmation sent.")
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
        onClick={() => setShowCompose(true)}
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
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <Check className="size-3 shrink-0 text-green-600 self-center" />
                <div className="flex flex-col">
                  <span>{date}</span>
                  {log.sentBy && <span className="truncate">{log.sentBy}</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ComposeEmailDialog
        isOpen={showCompose}
        onClose={() => setShowCompose(false)}
        stays={staySummaries}
        bookerEmail={bookerEmail}
        bookerName={bookerFullName}
        confirmationNo={allData.confirmationNo ?? ""}
        senderName={user?.name ?? "CMP Team"}
        onSend={handleSend}
        isSending={isSending}
      />
    </div>
  )
}
