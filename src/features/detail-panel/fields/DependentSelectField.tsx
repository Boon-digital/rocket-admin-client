import { useEffect, useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CircleNotch } from '@phosphor-icons/react'
import type { FieldRendererProps, SelectOption } from '../types'
import { formatValue, isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

export function DependentSelectField({ field, value, onChange, mode, error, allData }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const config = field.dependentSelectConfig

  const [options, setOptions] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)
  const prevParentId = useRef<string | undefined>(undefined)

  const parentId = config ? (allData as any)?.[config.dependsOn] : undefined

  useEffect(() => {
    if (!config) return

    // If parent changed (not on first mount with existing value), clear the value
    if (prevParentId.current !== undefined && prevParentId.current !== parentId) {
      onChange('')
    }
    prevParentId.current = parentId

    if (!parentId) {
      setOptions([])
      return
    }

    let cancelled = false
    setLoading(true)

    config.fetchEntity(parentId).then((entity) => {
      if (cancelled) return
      setOptions(config.mapOptions(entity))
      setLoading(false)
    }).catch(() => {
      if (cancelled) return
      setOptions([])
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [parentId, config])

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

  const noParent = !parentId
  const placeholder = noParent
    ? (config?.noParentMessage || 'Select a parent first')
    : loading
      ? 'Loading...'
      : (field.placeholder || 'Select an option')

  return (
    <div className="space-y-2">
      <FieldLabel field={field} htmlFor={field.key}>
        {field.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <Select
        value={value || ''}
        onValueChange={onChange}
        disabled={noParent}
      >
        <SelectTrigger className={`w-full ${error ? 'border-destructive' : ''}`}>
          {loading ? (
            <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <CircleNotch className="h-3.5 w-3.5 shrink-0 animate-spin" />
              <span className="truncate">Loading...</span>
            </span>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent>
          {options.filter((option) => option.value !== '').length === 0 && !loading ? (
            <div className="py-2 px-3 text-sm text-muted-foreground">
              {noParent ? (config?.noParentMessage || 'Select a parent first') : 'No rooms for this hotel found'}
            </div>
          ) : (
            options
              .filter((option) => option.value !== '')
              .map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
          )}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
