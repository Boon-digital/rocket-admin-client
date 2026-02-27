import { useState, useEffect } from 'react'
import { Check, CaretUpDown } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
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
import { FieldLabel } from './FieldLabel'
import { CopyableValue } from './CopyableValue'

export function SearchReferenceField(props: FieldRendererProps) {
  const { field, value, onChange, mode, error } = props
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItemLabel, setSelectedItemLabel] = useState<string | null>(null)

  const isDisabled = mode === 'view' || field.readOnlyInEdit

  // Fetch the selected item's label when value changes
  useEffect(() => {
    if (!value || !field.searchConfig?.fetchFunction) {
      setSelectedItemLabel(null)
      return
    }

    // Don't use options for the selected label - always fetch to get the correct display fields
    // (options use displayFields, but we want to use selectedDisplayFields for the selected item)

    // Fetch the selected item to get its label
    const fetchSelectedItem = async () => {
      try {
        const fieldsToDisplay = field.searchConfig!.selectedDisplayFields || field.searchConfig!.displayFields

        // Use dedicated fetchByIdFunction if available, otherwise fall back to search
        if (field.searchConfig!.fetchByIdFunction) {
          const result = await field.searchConfig!.fetchByIdFunction(value)
          if (result) {
            const label = fieldsToDisplay
              .map((fieldKey: string) => getNestedValue(result, fieldKey))
              .filter(Boolean)
              .join(' - ')
            setSelectedItemLabel(label)
          }
          return
        }

        const results = await field.searchConfig!.fetchFunction(value)
        if (results && results.length > 0) {
          const result = results[0]
          const label = fieldsToDisplay
            .map((fieldKey: string) => getNestedValue(result, fieldKey))
            .filter(Boolean)
            .join(' - ')
          setSelectedItemLabel(label)
        }
      } catch (err) {
        console.error('Error fetching selected item:', err)
        setSelectedItemLabel(null)
      }
    }

    fetchSelectedItem()
  }, [value, field.searchConfig, options])

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

        // Map results to options using the configured display fields
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

  // Get current selection label (use selectedItemLabel or fall back to value/ID)
  const selectedLabel = selectedItemLabel || value

  // View mode rendering (read-only)
  if (isDisabled) {
    return (
      <div className="space-y-2">
        {!field.hideLabel && <FieldLabel field={field} />}
        <CopyableValue value={selectedLabel || '-'} />
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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between',
              !value && 'text-muted-foreground',
              error && 'border-red-500'
            )}
            disabled={isDisabled}
          >
            <span className="truncate">{value ? selectedLabel : field.placeholder || 'Search...'}</span>
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
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue)
                      setOpen(false)
                      setSearchQuery('')
                    }}
                    className="overflow-hidden"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 shrink-0',
                        value === option.value ? 'opacity-100' : 'opacity-0'
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

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

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
