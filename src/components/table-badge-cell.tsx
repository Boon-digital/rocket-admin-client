import { Badge } from '@/components/ui/badge'
import { getBadgeVariant, type BadgeVariantMap } from '@/lib/badge-utils'

interface TableBadgeCellProps {
  value: string | undefined
  displayValue?: string
  variantMap: BadgeVariantMap
  fallback?: string
  capitalize?: boolean
}

/**
 * Reusable badge cell component for table columns
 * Displays a value as a colored badge based on the variant map
 */
export function TableBadgeCell({
  value,
  displayValue,
  variantMap,
  fallback = '-',
  capitalize = false,
}: TableBadgeCellProps) {
  if (!value) {
    return <span className="text-muted-foreground text-sm">{fallback}</span>
  }

  const label = displayValue ?? value
  const text = capitalize
    ? label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
    : label

  return (
    <Badge variant={getBadgeVariant(value, variantMap)}>
      {text}
    </Badge>
  )
}
