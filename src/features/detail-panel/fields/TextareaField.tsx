import type { FieldRendererProps } from '../types'
import { formatValue, isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

export function TextareaField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)

  if (readOnly) {
    return (
      <div className="space-y-2">
        <FieldLabel field={field} />
        <p className="text-sm text-foreground line-clamp-3" title={formatValue(value, field)}>
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
      <textarea
        id={field.key}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={1}
        className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${error ? 'border-destructive' : ''}`}
        style={{ fieldSizing: 'content', minHeight: 0 } as React.CSSProperties}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
