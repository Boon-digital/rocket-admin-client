import type { FieldRendererProps } from '../types'
import { formatValue, isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

export function ArrayField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const arrayValue = Array.isArray(value) ? value : []

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

  // Simple comma-separated input for now
  const handleChange = (val: string) => {
    const items = val.split(',').map(item => item.trim()).filter(Boolean)
    onChange(items)
  }

  return (
    <div className="space-y-2">
      <FieldLabel field={field} htmlFor={field.key}>
        {field.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <input
        id={field.key}
        type="text"
        value={arrayValue.join(', ')}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={field.placeholder || 'Comma-separated values'}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${error ? 'border-destructive' : ''}`}
      />
      {error && <p className="text-sm text-descriptive">{error}</p>}
    </div>
  )
}
