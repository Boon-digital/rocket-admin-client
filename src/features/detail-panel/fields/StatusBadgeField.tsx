import type { FieldRendererProps } from '../types'
import { FieldLabel } from './FieldLabel'
import { StatusBadge } from '@/components/status-badge'
import type { BadgeVariantMap } from '@/lib/badge-utils'

interface StatusBadgeFieldConfig {
  statusVariantMap: BadgeVariantMap
  statusLabels: Record<string, string>
  subStatusVariantMap: BadgeVariantMap
  subStatusLabels: Record<string, string>
}

/**
 * Detail panel field that merges status + subStatus into one badge.
 * Pass the variant maps via field.componentProps.
 * The field key should be 'status'; subStatus is read from allData.
 */
export function makeStatusBadgeField(config: StatusBadgeFieldConfig) {
  return function StatusBadgeFieldComponent({ field, value, allData }: FieldRendererProps) {
    return (
      <div className="space-y-2">
        <FieldLabel field={field} />
        <div>
          <StatusBadge
            status={value}
            subStatus={(allData as any)?.subStatus}
            {...config}
          />
        </div>
      </div>
    )
  }
}
