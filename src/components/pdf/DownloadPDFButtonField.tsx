import type { FieldRendererProps } from "@/features/detail-panel/types"
import { DownloadPDFButton } from "./DownloadPDFButton"

export function DownloadPDFButtonField({ mode, allData, isDirty }: FieldRendererProps) {
  if (mode !== "view" || !allData) return null

  const id = typeof allData._id === "object" ? (allData._id as any).$oid : String(allData._id)

  const bookingData = {
    _id: id,
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

  const staySummaries = (allData.staySummaries ?? []).map((s: any) => ({
    _id: s.stayId,
    hotelName: s.hotelName,
    checkInDate: s.checkInDate,
    checkOutDate: s.checkOutDate,
    guestCount: s.guestNames?.length ?? 0,
  }))

  const documents = Array.isArray(allData.documents) ? allData.documents : []

  return (
    <div className="pt-2">
      <DownloadPDFButton
        bookingData={bookingData}
        staySummaries={staySummaries}
        documents={documents}
        isDirty={isDirty}
      />
    </div>
  )
}
