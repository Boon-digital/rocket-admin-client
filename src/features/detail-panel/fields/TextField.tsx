import { Input } from '@/components/ui/input'
import type { FieldRendererProps } from '../types'
import { formatValue, isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

export function TextField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)

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
      <FieldLabel field={field} htmlFor={field.key}>
        {field.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <Input
        id={field.key}
        type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
        value={typeof value === 'object' ? '' : (value || '')}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={error ? 'border-destructive' : ''}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
