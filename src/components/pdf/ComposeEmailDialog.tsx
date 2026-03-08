import { useState, useEffect } from "react"
import { PaperPlaneTilt, Paperclip, Bed, X } from "@phosphor-icons/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { ModalStay } from "./StaySelectionModal"

// ─── Configurable from address options ────────────────────────────────────────
// To add or remove options, edit this array.
const FROM_OPTIONS = [
  { value: "reservations@corporatemeetingpartner.com", label: "reservations@corporatemeetingpartner.com" },
  { value: "noreply@corporatemeetingpartner.com", label: "noreply@corporatemeetingpartner.com" },
  { value: "info@corporatemeetingpartner.com", label: "info@corporatemeetingpartner.com" },
  { value: "invoice@corporatemeetingpartner.com", label: "invoice@corporatemeetingpartner.com" },
]

const DEFAULT_BCC = "donotreply@corporatemeetingpartner.com"
// ─────────────────────────────────────────────────────────────────────────────

export interface ComposeEmailValues {
  from: string
  to: string
  cc: string
  bcc: string
  subject: string
  bodyText: string
  selectedStayIds: string[]
}

interface ComposeEmailDialogProps {
  isOpen: boolean
  onClose: () => void
  stays: ModalStay[]
  bookerEmail: string
  bookerName: string
  confirmationNo: string
  senderName: string
  onSend: (values: ComposeEmailValues) => void
  isSending: boolean
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "-"
  try {
    return new Date(dateString)
      .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      .replace(/ /g, " ")
  } catch {
    return dateString
  }
}

function buildDefaultBody(bookerName: string, stays: ModalStay[], senderName: string): string {
  const lines = [
    `Dear ${bookerName || "Guest"},`,
    "",
    "Thank you for making your reservation with us. Please find attached your booking confirmation for the following details:",
    "",
  ]

  for (const s of stays) {
    const checkIn = formatDate(s.checkInDate)
    const checkOut = formatDate(s.checkOutDate)
    const guests = s.guestCount ? `${s.guestCount} guest${s.guestCount !== 1 ? "s" : ""}` : ""
    lines.push(`• ${s.hotelName || "Hotel"} — ${checkIn} → ${checkOut}${guests ? ` (${guests})` : ""}`)
  }

  lines.push(
    "",
    "Should you have any questions or need to make any changes, please do not hesitate to contact us directly.",
    "",
    "We hope you and/or your guest(s) have a pleasant stay.",
    "",
    `Kind regards,`,
    senderName || "CMP Team",
  )

  return lines.join("\n")
}

export function ComposeEmailDialog({
  isOpen,
  onClose,
  stays,
  bookerEmail,
  bookerName,
  confirmationNo,
  senderName,
  onSend,
  isSending,
}: ComposeEmailDialogProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [from, setFrom] = useState(FROM_OPTIONS[0].value)
  const [to, setTo] = useState("")
  const [cc, setCc] = useState("")
  const [bcc, setBcc] = useState(DEFAULT_BCC)
  const [subject, setSubject] = useState("")
  const [bodyText, setBodyText] = useState("")
  const [selectedStayIds, setSelectedStayIds] = useState<Set<string>>(new Set())

  // Mount/unmount with animation (same pattern as EntityModal)
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 400)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  // Reset / pre-fill when dialog opens
  useEffect(() => {
    if (!isOpen) return
    setFrom(FROM_OPTIONS[0].value)
    setTo(bookerEmail)
    setCc("")
    setBcc(DEFAULT_BCC)
    setSubject(`Your hotel confirmation: ${confirmationNo}`)

    const allIds = new Set(stays.map((s) => s._id))
    setSelectedStayIds(allIds)
    setBodyText(buildDefaultBody(bookerName, stays, senderName))
  }, [isOpen, bookerEmail, bookerName, confirmationNo, stays, senderName])

  const handleStayToggle = (id: string) => {
    setSelectedStayIds((prev) => {
      // Prevent deselecting the last one
      if (prev.has(id) && prev.size === 1) return prev
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      // Rebuild body with newly selected stays (in original order)
      const selected = stays.filter((s) => next.has(s._id))
      setBodyText(buildDefaultBody(bookerName, selected, senderName))
      return next
    })
  }

  const canSend = to.trim().length > 0 && selectedStayIds.size > 0 && !isSending

  const handleSend = () => {
    onSend({
      from,
      to: to.trim(),
      cc: cc.trim(),
      bcc: bcc.trim(),
      subject: subject.trim(),
      bodyText: bodyText.trim(),
      selectedStayIds: [...selectedStayIds],
    })
  }

  const pdfFilename = `confirmation_${confirmationNo || "booking"}.pdf`

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.6,1)]"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Panel — same sizing as 8-column EntityModal */}
      <div
        className="relative z-10 h-[96vh] w-[852px] max-w-[96vw] mr-[2vh] overflow-hidden rounded-lg bg-background shadow-xl flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.6,1)]"
        style={{ transform: visible ? "scale(1)" : "scale(0)", transformOrigin: "right center" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-base font-semibold">Send confirmation</h2>
          <Button variant="ghost" size="icon" onClick={onClose} type="button" className="size-8">
            <X className="size-4" />
          </Button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

        {/* ── Email header fields ── */}
        <div className="space-y-0 rounded-md border divide-y">
          {/* From */}
          <div className="flex items-center px-3 py-2 gap-3">
            <Label className="w-12 shrink-0 text-muted-foreground text-xs">From</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="border-0 shadow-none h-auto py-0 px-0 text-sm focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FROM_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To */}
          <div className="flex items-center px-3 py-2 gap-3">
            <Label className="w-12 shrink-0 text-muted-foreground text-xs">To</Label>
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="border-0 shadow-none h-auto py-0 px-0 text-sm focus-visible:ring-0"
            />
          </div>

          {/* CC */}
          <div className="flex items-center px-3 py-2 gap-3">
            <Label className="w-12 shrink-0 text-muted-foreground text-xs">CC</Label>
            <Input
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder="cc@example.com, other@example.com"
              className="border-0 shadow-none h-auto py-0 px-0 text-sm focus-visible:ring-0"
            />
          </div>

          {/* BCC */}
          <div className="flex items-center px-3 py-2 gap-3">
            <Label className="w-12 shrink-0 text-muted-foreground text-xs">BCC</Label>
            <Input
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
              placeholder="bcc@example.com"
              className="border-0 shadow-none h-auto py-0 px-0 text-sm focus-visible:ring-0"
            />
          </div>

          {/* Subject */}
          <div className="flex items-center px-3 py-2 gap-3">
            <Label className="w-12 shrink-0 text-muted-foreground text-xs">Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              className="border-0 shadow-none h-auto py-0 px-0 text-sm focus-visible:ring-0"
            />
          </div>
        </div>

        {/* ── Stay selection (checkbox cards, min 1 required) ── */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Include stays</Label>

          {stays.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 rounded-md border text-muted-foreground">
              <Bed className="size-7 mb-2 opacity-30" />
              <p className="text-sm">No stays on this booking.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {stays.map((stay) => {
                const selected = selectedStayIds.has(stay._id)
                const isLast = selectedStayIds.size === 1 && selected
                const checkIn = formatDate(stay.checkInDate)
                const checkOut = formatDate(stay.checkOutDate)
                const guests = stay.guestCount
                  ? `${stay.guestCount} guest${stay.guestCount !== 1 ? "s" : ""}`
                  : null

                return (
                  <button
                    key={stay._id}
                    type="button"
                    disabled={isLast}
                    onClick={() => handleStayToggle(stay._id)}
                    className={cn(
                      "w-full text-left flex items-start justify-between gap-4 rounded-lg border p-4 transition-colors",
                      selected ? "bg-accent border-border" : "hover:bg-accent/40",
                      isLast && "cursor-not-allowed opacity-75"
                    )}
                  >
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="text-sm font-medium leading-snug">
                        {stay.hotelName || "Unknown Hotel"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {checkIn} – {checkOut}
                        {guests ? ` · ${guests}` : ""}
                      </span>
                    </div>
                    {/* Custom checkbox indicator matching the radio style */}
                    <div
                      className={cn(
                        "mt-0.5 size-5 shrink-0 rounded-[4px] border-2 flex items-center justify-center transition-colors",
                        selected ? "border-foreground bg-foreground" : "border-muted-foreground/40"
                      )}
                    >
                      {selected && (
                        <svg viewBox="0 0 10 8" className="size-3 text-background fill-none stroke-current stroke-[1.5]">
                          <polyline points="1,4 3.5,6.5 9,1" />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <Separator />

        {/* ── Body textarea ── */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Message</Label>
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            rows={10}
            className={cn(
              "w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-ring/50 focus-visible:border-ring transition-[color,box-shadow]",
              "min-h-[180px]"
            )}
            placeholder="Email body…"
          />
        </div>

        {/* ── Attachment badge ── */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground rounded-md border px-3 py-2">
          <Paperclip className="size-3.5 shrink-0" />
          <span className="truncate">{pdfFilename}</span>
          <span className="ml-auto shrink-0 opacity-60">PDF · generated on send</span>
        </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t shrink-0">
          <Button variant="ghost" onClick={onClose} disabled={isSending} type="button">
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!canSend} size="sm" type="button">
            <PaperPlaneTilt className="size-4" />
            {isSending ? "Sending…" : "Send"}
          </Button>
        </div>
      </div>
    </div>
  )
}
