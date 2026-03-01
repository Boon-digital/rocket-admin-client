import { useState, useEffect } from "react"
import { PaperPlaneTilt, Check } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { fetchContactById } from "@/features/contacts/api"
import type { FieldRendererProps } from "@/features/detail-panel/types"

function formatDate(dateString: string | undefined): string {
  if (!dateString) return "-"
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, "/")
  } catch {
    return dateString
  }
}

export function SendConfirmationButtonField({
  mode,
  allData,
  onChange,
  onRequestSave,
}: FieldRendererProps) {
  if (mode !== "view" || !allData) return null

  const [isSending, setIsSending] = useState(false)
  const [bookerData, setBookerData] = useState<any>(null)

  const bookerId =
    typeof allData.bookerId === "object"
      ? (allData.bookerId as any).$oid
      : allData.bookerId

  useEffect(() => {
    if (!bookerId) {
      setBookerData(null)
      return
    }
    fetchContactById(bookerId)
      .then((c) => setBookerData(c))
      .catch(() => setBookerData(null))
  }, [bookerId])

  const handleSend = async () => {
    setIsSending(true)
    try {
      const firstName = bookerData?.general?.firstName ?? ""
      const lastName = bookerData?.general?.lastName ?? ""
      const bookerFullName = `${firstName} ${lastName}`.trim()
      const bookerEmail = bookerData?.general?.email ?? ""

      const staySummaries: any[] = allData.staySummaries ?? []

      const stayDetailsText = staySummaries
        .map((s) => {
          const guestNames =
            s.guestNames && s.guestNames.length > 0
              ? s.guestNames.join(", ")
              : "N/A"
          return `Hotel: ${s.hotelName || "N/A"}, Guest: ${guestNames}, Check-in: ${formatDate(s.checkInDate)}, Check-out: ${formatDate(s.checkOutDate)}`
        })
        .join("\n")

      const subject = `Your hotel confirmation: ${allData.confirmationNo ?? ""}`
      const body = `Dear ${bookerFullName},\n\nThank you for making your reservation with us. Please find attached your booking confirmation for the following details:\n\n${stayDetailsText}\n\nShould you have any questions or need to make any changes, please do not hesitate to contact us directly.\n\nWe hope you and/or your guest(s) have a pleasant stay.`

      // Copy body to clipboard
      try {
        await navigator.clipboard.writeText(body)
        toast.success("Email body copied to clipboard — paste it into your new email.")
      } catch {
        toast.error("Could not copy email body to clipboard.")
      }

      // Open mailto
      const bcc = "donotreply@corporatemeetingpartner.com"
      const mailtoUrl = `mailto:${encodeURIComponent(bookerEmail)}?subject=${encodeURIComponent(subject)}&bcc=${encodeURIComponent(bcc)}`
      window.open(mailtoUrl, "_blank")

      // Mark confirmation as sent and update status
      if (!allData.confirmationSent) {
        onChange?.("confirmationSent", true)
        if (!allData.statusManuallySet) {
          onChange?.("status", "upcoming_confirmation_sent")
        }
        const saved = await onRequestSave?.()
        if (saved) {
          toast.success("Confirmation marked as sent.")
        }
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="pt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSend}
        disabled={isSending}
        type="button"
      >
        <PaperPlaneTilt className="size-4 mr-2" />
        {isSending ? "Sending…" : "Send Confirmation"}
      </Button>
      {allData.confirmationSent && (
        <p className="text-xs text-green-700 dark:text-green-400 mt-1 flex items-center gap-1"><Check className="size-3" />Confirmation sent</p>
      )}
    </div>
  )
}
