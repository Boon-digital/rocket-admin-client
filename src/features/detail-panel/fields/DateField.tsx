import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { FieldRendererProps } from '../types'
import { formatValue, isFieldReadOnly } from '../utils'
import { cn } from '@/lib/utils'
import { FieldLabel } from './FieldLabel'

export function DateField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const [open, setOpen] = useState(false)

  // Parse the value to a Date object, handling invalid dates
  const parseDateValue = (val: any): Date | undefined => {
    if (!val) return undefined
    const date = new Date(val)
    // Check if the date is valid
    if (isNaN(date.getTime())) return undefined
    return date
  }
  const dateValue = parseDateValue(value)

  // Handle date selection from calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date.toISOString())
      setOpen(false)
    }
  }

  // Format date for input (YYYY-MM-DD or YYYY-MM-DDTHH:mm)
  const formatForInput = (val: any) => {
    if (!val) return ''
    const date = new Date(val)
    // Check if the date is valid
    if (isNaN(date.getTime())) return ''
    if (field.type === 'datetime') {
      return date.toISOString().slice(0, 16)
    }
    return date.toISOString().slice(0, 10)
  }

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

  // For datetime type, use the native input
  if (field.type === 'datetime') {
    return (
      <div className="space-y-2">
        <FieldLabel field={field} htmlFor={field.key}>
          {field.required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
        <Input
          id={field.key}
          type="datetime-local"
          value={formatForInput(value)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={error ? 'border-destructive' : ''}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }

  // For date type, use the calendar popover
  return (
    <div className="space-y-2">
      <FieldLabel field={field} htmlFor={field.key}>
        {field.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !dateValue && 'text-muted-foreground',
              error && 'border-destructive'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" weight="light" />
            <span className="truncate">
              {dateValue ? format(dateValue, 'PPP') : field.placeholder || 'Pick a date'}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
