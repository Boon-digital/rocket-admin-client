import { Badge } from '@/components/ui/badge'
import { getBadgeVariant, type BadgeVariantMap } from '@/lib/badge-utils'

interface StatusBadgeProps {
  status: string | undefined | null
  subStatus: string | undefined | null
  statusVariantMap: BadgeVariantMap
  statusLabels: Record<string, string>
  subStatusVariantMap: BadgeVariantMap
  subStatusLabels: Record<string, string>
}

/**
 * Renders subStatus badge when present, otherwise status badge.
 * Used in table cells, reference tables, and detail panel fields.
 */
export function StatusBadge({
  status,
  subStatus,
  statusVariantMap,
  statusLabels,
  subStatusVariantMap,
  subStatusLabels,
}: StatusBadgeProps) {
  if (subStatus) {
    return (
      <Badge variant={getBadgeVariant(subStatus, subStatusVariantMap)}>
        {subStatusLabels[subStatus] ?? subStatus}
      </Badge>
    )
  }

  if (!status) {
    return <span className="text-muted-foreground text-sm">-</span>
  }

  return (
    <Badge variant={getBadgeVariant(status, statusVariantMap)}>
      {statusLabels[status] ?? status}
    </Badge>
  )
}
