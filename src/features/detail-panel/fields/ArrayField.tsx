import type { FieldRendererProps, FieldConfig } from '../types'
import { formatValue, isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'
import { FieldRenderer } from './FieldRenderer'
import { Button } from '@/components/ui/button'
import { Plus, Trash } from '@phosphor-icons/react'

export function ArrayField({ field, value, onChange, mode, error, allData }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const arrayValue = Array.isArray(value) ? value : []
  const hasItemConfig = field.arrayItemConfig?.fields && field.arrayItemConfig.fields.length > 0

  // For simple arrays (no arrayItemConfig), use basic comma-separated display
  if (!hasItemConfig) {
    if (readOnly) {
      return (
        <div className="space-y-2">
          {!field.hideLabel && <FieldLabel field={field} />}
          <p className="text-sm text-foreground truncate" title={formatValue(value, field)}>
            {formatValue(value, field)}
          </p>
        </div>
      )
    }

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
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }

  // For object arrays with arrayItemConfig
  const itemFields = field.arrayItemConfig!.fields as FieldConfig[]

  // View mode - display items in a readable format
  if (readOnly) {
    if (arrayValue.length === 0) {
      return (
        <div className="space-y-2">
          {!field.hideLabel && <FieldLabel field={field} />}
          <p className="text-sm text-muted-foreground">No items</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {!field.hideLabel && <FieldLabel field={field} />}
        <div className="space-y-3">
          {arrayValue.map((item: Record<string, any>, index: number) => (
            <div key={index} className="rounded-lg border bg-muted/30 p-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {itemFields.map((itemField) => {
                  const fieldValue = item[itemField.key]
                  // Skip password fields in view mode or show masked
                  const displayValue = itemField.type === 'password'
                    ? (fieldValue ? '••••••••' : '-')
                    : formatValue(fieldValue, itemField)

                  return (
                    <div key={itemField.key} className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{itemField.label}</span>
                      <span className="text-sm truncate" title={displayValue}>{displayValue}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Edit mode - allow editing items
  const handleItemChange = (index: number, fieldKey: string, newValue: any) => {
    const newArray = [...arrayValue]
    newArray[index] = { ...newArray[index], [fieldKey]: newValue }
    onChange(newArray)
  }

  const handleAddItem = () => {
    const newItem: Record<string, any> = {}
    itemFields.forEach(f => {
      newItem[f.key] = f.defaultValue ?? ''
    })
    onChange([...arrayValue, newItem])
  }

  const handleRemoveItem = (index: number) => {
    const newArray = arrayValue.filter((_: any, i: number) => i !== index)
    onChange(newArray)
  }

  return (
    <div className="space-y-3">
      {!field.hideLabel && (
        <FieldLabel field={field}>
          {field.required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
      )}

      <div className="space-y-3">
        {arrayValue.map((item: Record<string, any>, index: number) => (
          <div key={index} className="relative rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-3">
              {itemFields.map((itemField) => (
                <div key={itemField.key}>
                  <FieldRenderer
                    field={{ ...itemField, key: `${field.key}[${index}].${itemField.key}` } as FieldConfig}
                    value={item[itemField.key]}
                    onChange={(newValue: any) => handleItemChange(index, itemField.key, newValue)}
                    mode={mode}
                    allData={allData}
                  />
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              onClick={() => handleRemoveItem(index)}
            >
              <Trash className="h-4 w-4" weight="light" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddItem}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" weight="light" />
        Add {field.label?.replace(/s$/, '') || 'Item'}
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
