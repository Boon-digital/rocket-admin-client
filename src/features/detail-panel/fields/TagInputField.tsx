import { useState, useRef, useCallback } from 'react'
import { X } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import type { FieldRendererProps } from '../types'
import { isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'

export function TagInputField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const tags: string[] = Array.isArray(value) ? value : []
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions = field.suggestions ?? []

  const filteredSuggestions = inputValue.trim()
    ? suggestions.filter(
        (s) =>
          s.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tags.includes(s)
      )
    : []

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    setInputValue('')
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }, [tags, onChange])

  const removeTag = useCallback((index: number) => {
    onChange(tags.filter((_, i) => i !== index))
  }, [tags, onChange])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
        addTag(filteredSuggestions[highlightedIndex])
      } else if (inputValue.trim()) {
        addTag(inputValue)
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setHighlightedIndex(-1)
    }
  }

  if (readOnly) {
    return (
      <div className="space-y-2">
        <FieldLabel field={field} />
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary">{tag}</Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">-</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2" ref={containerRef}>
      <FieldLabel field={field} htmlFor={field.key}>
        {field.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <div
        className={`flex flex-wrap gap-1.5 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${error ? 'border-destructive' : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary" className="gap-1 shrink-0">
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(i) }}
              className="rounded-full hover:bg-muted-foreground/20 p-0.5"
            >
              <X className="h-3 w-3" weight="light" />
            </button>
          </Badge>
        ))}
        <div className="relative flex-1 min-w-[120px]">
          <input
            ref={inputRef}
            id={field.key}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setShowSuggestions(true)
              setHighlightedIndex(-1)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // Delay to allow click on suggestion
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? (field.placeholder || 'Type and press Enter') : ''}
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm h-6"
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 top-full mt-1 z-50 w-64 max-h-48 overflow-y-auto rounded-md border bg-popover shadow-md">
              {filteredSuggestions.map((suggestion, i) => (
                <button
                  key={suggestion}
                  type="button"
                  className={`w-full text-left px-3 py-1.5 text-sm hover:bg-accent ${i === highlightedIndex ? 'bg-accent' : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    addTag(suggestion)
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
