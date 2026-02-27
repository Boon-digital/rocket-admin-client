import { useState, useEffect } from 'react'
import { Check, CaretUpDown, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { FieldRendererProps } from '../types'
import { isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

// Helper function to get nested values from objects
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

/**
 * Extract ID from entity - supports both formats:
 * - MongoDB style: { _id: { $oid: "..." } }
 * - Simple style: { _id: "..." } or { _id: 123 }
 */
function extractEntityId(entity: any): string {
  if (!entity?._id) return entity?.id ?? ''
  if (typeof entity._id === 'object' && '$oid' in entity._id) {
    return entity._id.$oid
  }
  return String(entity._id)
}

export function MultiSearchReferenceField(props: FieldRendererProps) {
  const { field, value, onChange, mode, error } = props
  const readOnly = isFieldReadOnly(field, mode)
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLabels, setSelectedLabels] = useState<Record<string, string>>({})

  // Extract IDs from value - handles both array of strings and array of objects
  const extractIds = (val: any): string[] => {
    if (!Array.isArray(val)) return []
    const itemKey = field.searchConfig?.itemValueKey
    return val.map((item) => {
      if (typeof item === 'string') return item
      if (itemKey && typeof item === 'object' && item !== null) {
        return String(item[itemKey] ?? '')
      }
      return String(item)
    }).filter(Boolean)
  }

  const selectedIds: string[] = extractIds(value)

  // Fetch labels for all selected items
  useEffect(() => {
    if (selectedIds.length === 0 || !field.searchConfig?.fetchFunction) {
      setSelectedLabels({})
      return
    }

    const fetchLabels = async () => {
      const fieldsToDisplay = field.searchConfig!.selectedDisplayFields || field.searchConfig!.displayFields
      const newLabels: Record<string, string> = {}

      await Promise.all(
        selectedIds.map(async (id) => {
          // Skip if we already have a label for this ID
          if (selectedLabels[id]) {
            newLabels[id] = selectedLabels[id]
            return
          }
          try {
            let result: any = null
            if (field.searchConfig!.fetchByIdFunction) {
              result = await field.searchConfig!.fetchByIdFunction(id)
            } else {
              const results = await field.searchConfig!.fetchFunction(id)
              result = results?.[0] ?? null
            }
            if (result) {
              const label = fieldsToDisplay
                .map((fieldKey: string) => getNestedValue(result, fieldKey))
                .filter(Boolean)
                .join(' ')
              newLabels[id] = label
            }
          } catch (err) {
            console.error('Error fetching label for', id, err)
          }
        })
      )

      setSelectedLabels(newLabels)
    }

    fetchLabels()
  // Only re-fetch when the array of IDs changes (by value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(selectedIds), field.searchConfig])

  // Fetch search results based on query
  useEffect(() => {
    if (!field.searchConfig?.fetchFunction || searchQuery.length < 1) {
      setOptions([])
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const results = await field.searchConfig!.fetchFunction(searchQuery)
        const mappedOptions = results.map((result: any) => ({
          value: field.searchConfig!.valueKey
            ? getNestedValue(result, field.searchConfig!.valueKey)
            : extractEntityId(result),
          label: field.searchConfig!.displayFields
            .map((fieldKey: string) => getNestedValue(result, fieldKey))
            .filter(Boolean)
            .join(' - '),
        }))
        setOptions(mappedOptions)
      } catch (err) {
        console.error('Error fetching search results:', err)
        setOptions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, field.searchConfig])

  // Helper to convert IDs back to the original value format
  const idsToValue = (ids: string[]): any[] => {
    const itemKey = field.searchConfig?.itemValueKey
    if (itemKey) {
      // Return as array of objects: [{ domain: "123" }, ...]
      return ids.map((id) => ({ [itemKey]: id }))
    }
    // Return as array of strings
    return ids
  }

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(idsToValue(selectedIds.filter((v) => v !== id)))
    } else {
      onChange(idsToValue([...selectedIds, id]))
      // Store the label from options temporarily; useEffect will override with selectedDisplayFields
      const option = options.find((o) => o.value === id)
      if (option) {
        setSelectedLabels((prev) => ({ ...prev, [id]: option.label }))
      }
    }
    setSearchQuery('')
  }

  const handleRemove = (id: string) => {
    onChange(idsToValue(selectedIds.filter((v) => v !== id)))
  }

  // View mode
  if (readOnly) {
    return (
      <div className="space-y-2">
        {!field.hideLabel && <FieldLabel field={field} />}
        {selectedIds.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {selectedIds.map((id) => (
              <Badge key={id} variant="secondary" className="max-w-full truncate">
                {selectedLabels[id] || id}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">-</p>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {!field.hideLabel && (
        <FieldLabel field={field}>
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </FieldLabel>
      )}

      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedIds.map((id) => (
            <Badge key={id} variant="secondary" className="gap-1 max-w-full">
              <span className="truncate">{selectedLabels[id] || id}</span>
              <button
                type="button"
                onClick={() => handleRemove(id)}
                className="rounded-full hover:bg-muted-foreground/20 p-0.5"
              >
                <X className="h-3 w-3" weight="light" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between',
              !selectedIds.length && 'text-muted-foreground',
              error && 'border-red-500'
            )}
          >
            <span className="truncate">
              {selectedIds.length === 0 ? (field.placeholder || 'Search...') : 'Add another...'}
            </span>
            <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" weight="light" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start" sideOffset={4}>
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={field.searchConfig?.searchPlaceholder || 'Type to search...'}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? 'Loading...' : 'No results found.'}
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                    className="overflow-hidden"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 shrink-0',
                        selectedIds.includes(option.value) ? 'opacity-100' : 'opacity-0'
                      )}
                      weight="light"
                    />
                    <span className="truncate">{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
