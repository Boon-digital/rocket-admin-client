import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FieldRendererProps } from '../types'
import { formatValue, isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

const CUSTOM_SENTINEL = '__custom__'

export function SelectField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const hasCustomOption = field.options?.some((o) => o.value === CUSTOM_SENTINEL)
  const isKnownValue = field.options?.some((o) => o.value === value)
  const isCustomActive = hasCustomOption && value !== undefined && value !== null && value !== '' && !isKnownValue

  const [customMode, setCustomMode] = useState(isCustomActive)
  const [customText, setCustomText] = useState(isCustomActive ? value : '')

  useEffect(() => {
    if (isCustomActive) {
      setCustomMode(true)
      setCustomText(value)
    }
  }, [])

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

  const handleSelectChange = (newValue: string) => {
    if (newValue === CUSTOM_SENTINEL) {
      setCustomMode(true)
      setCustomText('')
      onChange('')
    } else {
      setCustomMode(false)
      setCustomText('')
      onChange(newValue)
    }
  }

  const handleCustomTextChange = (text: string) => {
    setCustomText(text)
    onChange(text)
  }

  const handleBackToSelect = () => {
    setCustomMode(false)
    setCustomText('')
    onChange('')
  }

  if (customMode) {
    return (
      <div className="space-y-2">
        <FieldLabel field={field} htmlFor={field.key}>
          {field.required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
        <div className="flex gap-2">
          <Input
            id={field.key}
            value={customText}
            onChange={(e) => handleCustomTextChange(e.target.value)}
            placeholder="Type custom value..."
            className={`flex-1 ${error ? 'border-destructive' : ''}`}
          />
          <button
            type="button"
            onClick={handleBackToSelect}
            className="text-xs text-muted-foreground hover:text-foreground px-2"
          >
            ✕
          </button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <FieldLabel field={field} htmlFor={field.key}>
        {field.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <Select value={value || ''} onValueChange={handleSelectChange}>
        <SelectTrigger className={error ? 'border-destructive' : ''}>
          <SelectValue placeholder={field.placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent>
          {field.options
            ?.filter((option) => option.value !== '')
            .map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
