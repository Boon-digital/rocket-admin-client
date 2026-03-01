import type { FieldRendererProps } from '../types'
import { FieldLabel } from './FieldLabel'
import { CopyableValue } from './CopyableValue'

export function AutoGenerateField({ field, value }: FieldRendererProps) {
  const config = field.autoGenerateConfig
  const displayValue = value ? `${config?.displayPrefix ?? ''}${value}` : '—'

  return (
    <div className="space-y-2">
      <FieldLabel field={field} />
      <CopyableValue value={displayValue} />
    </div>
  )
}
