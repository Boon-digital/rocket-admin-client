import { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import type { FieldRendererProps } from '../types'
import { isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'
import { extractEntityId } from '@boon-digital/rocket-admin-config/entities/types'

const API_BASE = typeof window === 'undefined'
  ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001')
  : ''

async function fetchDecrypted(entity: string, id: string, field: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/v1/credentials/decrypt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ entity, id, field }),
  })
  if (!res.ok) throw new Error('Failed to decrypt')
  const json = await res.json()
  return json.data.plaintext as string
}

export function PasswordField({ field, value, onChange, mode, error, allData }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const [revealed, setRevealed] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isEncryptedValue = typeof value === 'string' && value === '[encrypted]'

  const handleMouseEnter = useCallback(async () => {
    if (!isEncryptedValue || revealed || loading) return

    // Derive entity and id from allData
    const entityKey = (allData as any)?._entityKey as string | undefined
    const id = allData ? extractEntityId(allData as any) : ''

    if (!entityKey || !id) return

    setLoading(true)
    try {
      const plaintext = await fetchDecrypted(entityKey, id, field.key)
      setRevealed(plaintext)
    } catch {
      setRevealed('Error decrypting')
    } finally {
      setLoading(false)
    }
  }, [isEncryptedValue, revealed, loading, allData, field.key])

  const handleMouseLeave = useCallback(() => {
    setRevealed(null)
  }, [])

  if (readOnly) {
    return (
      <div className="space-y-2">
        <FieldLabel field={field} />
        <p
          className="text-sm text-foreground font-mono cursor-default select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          title={isEncryptedValue ? 'Hover to reveal' : undefined}
        >
          {loading
            ? '••••••••'
            : revealed
              ? revealed
              : isEncryptedValue
                ? '••••••••'
                : value || '-'}
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
        type="password"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={error ? 'border-destructive' : ''}
        autoComplete="new-password"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
