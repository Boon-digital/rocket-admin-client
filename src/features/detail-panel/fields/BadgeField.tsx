import type { FieldRendererProps } from '../types'
import { FieldLabel } from './FieldLabel'
import { TableBadgeCell } from '@/components/table-badge-cell'

export function BadgeField({ field, value }: FieldRendererProps) {
  const displayValue = field.badgeLabels?.[value] ?? undefined

  return (
    <div className="space-y-2">
      <FieldLabel field={field} />
      <div>
        <TableBadgeCell
          value={value}
          displayValue={displayValue}
          variantMap={field.variantMap ?? {}}
        />
      </div>
    </div>
  )
}
