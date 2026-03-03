import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FileArrowDown, PaperPlaneTilt, Bed } from "@phosphor-icons/react"

export interface ModalStay {
  _id: string
  hotelName?: string
  checkInDate?: string
  checkOutDate?: string
  guestCount?: number
  roomPrice?: string
  roomCurrency?: string
}

interface StaySelectionModalProps {
  isOpen: boolean
  onClose: () => void
  stays: ModalStay[]
  onGeneratePDF: (selectedStays: ModalStay[]) => void
  isGenerating: boolean
  mode: "download" | "send"
}

const formatDate = (dateString?: string): string => {
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

const calculateNights = (checkInDate?: string, checkOutDate?: string): string => {
  if (!checkInDate || !checkOutDate) return "-"
  try {
    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    const diffTime = checkOut.getTime() - checkIn.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays.toString()
  } catch {
    return "-"
  }
}

export function StaySelectionModal({
  isOpen,
  onClose,
  stays,
  onGeneratePDF,
  isGenerating,
  mode,
}: StaySelectionModalProps) {
  const [selectedStays, setSelectedStays] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isOpen && stays.length > 0) {
      setSelectedStays(new Set(stays.map((s) => s._id)))
    }
  }, [isOpen, stays])

  const selectAll = selectedStays.size === stays.length && stays.length > 0

  const handleStayToggle = (stayId: string) => {
    const next = new Set(selectedStays)
    if (next.has(stayId)) {
      next.delete(stayId)
    } else {
      next.add(stayId)
    }
    setSelectedStays(next)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStays(new Set())
    } else {
      setSelectedStays(new Set(stays.map((s) => s._id)))
    }
  }

  const handleGeneratePDF = () => {
    onGeneratePDF(stays.filter((s) => selectedStays.has(s._id)))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "download" ? "Download confirmation" : "Send confirmation"}</DialogTitle>
          <DialogDescription>
            Select the stays to include.
          </DialogDescription>
        </DialogHeader>

        {/* Select All */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none py-1"
          onClick={handleSelectAll}
        >
          <Checkbox
            id="select-all"
            checked={selectAll}
            onCheckedChange={handleSelectAll}
            onClick={(e) => e.stopPropagation()}
          />
          <label htmlFor="select-all" className="cursor-pointer text-sm leading-none">
            Select all
          </label>
          <span className="text-xs text-muted-foreground ml-auto">
            {selectedStays.size} of {stays.length}
          </span>
        </div>

        {/* Stays List */}
        <div className="overflow-y-auto max-h-[320px] -mx-6 px-6 space-y-1">
          {stays.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Bed className="size-8 mb-2 opacity-30" />
              <p className="text-sm">No stays on this booking.</p>
            </div>
          ) : (
            stays.map((stay) => {
              const selected = selectedStays.has(stay._id)
              const nights = calculateNights(stay.checkInDate, stay.checkOutDate)
              return (
                <div
                  key={stay._id}
                  className={cn(
                    "flex items-center gap-2.5 rounded-sm px-2 py-3.5 cursor-pointer transition-colors",
                    selected ? "bg-accent" : "hover:bg-accent/50"
                  )}
                  onClick={() => handleStayToggle(stay._id)}
                >
                  <Checkbox
                    checked={selected}
                    onCheckedChange={() => handleStayToggle(stay._id)}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate leading-none">
                      {stay.hotelName || "Unknown Hotel"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(stay.checkInDate)} – {formatDate(stay.checkOutDate)}
                      {stay.guestCount ? ` · ${stay.guestCount} guest${stay.guestCount !== 1 ? "s" : ""}` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{nights}n</span>
                </div>
              )
            })
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isGenerating}>
            Cancel
          </Button>
          <Button
            onClick={handleGeneratePDF}
            disabled={selectedStays.size === 0 || isGenerating}
            size="sm"
          >
            {mode === "download" ? (
              <FileArrowDown className="size-4" />
            ) : (
              <PaperPlaneTilt className="size-4" />
            )}
            {isGenerating
              ? (mode === "download" ? "Generating…" : "Sending…")
              : (mode === "download" ? "Download Confirmation PDF" : "Send Confirmation PDF")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
