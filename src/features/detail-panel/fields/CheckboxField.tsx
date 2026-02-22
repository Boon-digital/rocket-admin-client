import { Checkbox } from '@/components/ui/checkbox'
import type { FieldRendererProps } from '../types'
import { formatValue, isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

export function CheckboxField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const checked = Boolean(value)

  if (readOnly) {
    return (
      <div className="space-y-2">
        <FieldLabel field={field} />
        <p className="text-sm text-foreground truncate" title={formatValue(value, field)}>
          {formatValue(value, field)}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={field.key}
          checked={checked}
          onCheckedChange={(checked) => onChange(Boolean(checked))}
        />
        <FieldLabel field={field} htmlFor={field.key}>
          {field.required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
