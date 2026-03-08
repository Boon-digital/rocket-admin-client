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
import { isFieldReadOnly } from '../utils'
import { FieldLabel } from './FieldLabel'
import { CopyableValue } from './CopyableValue'

function formatAmount(value: string): string {
  if (!value && value !== '0') return ''
  const num = parseFloat(String(value).replace(/,/g, ''))
  if (isNaN(num)) return value
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

function parseAmount(formatted: string): string {
  // Strip thousands commas, keep decimal dot
  return formatted.replace(/,/g, '')
}

const CURRENCIES = [
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'USD', label: 'USD' },
  { value: 'CHF', label: 'CHF' },
  { value: 'HUF', label: 'HUF' },
  { value: 'PLN', label: 'PLN' },
  { value: 'DKK', label: 'DKK' },
  { value: 'CAD', label: 'CAD' },
  { value: 'SEK', label: 'SEK' },
  { value: 'HKD', label: 'HKD' },
  { value: 'BRL', label: 'BRL' },
  { value: 'TRY', label: 'TRY' },
  { value: 'CZK', label: 'CZK' },
  { value: 'ISK', label: 'ISK' },
  { value: 'INR', label: 'INR' },
  { value: 'NOK', label: 'NOK' },
  { value: 'RSD', label: 'RSD' },
  { value: 'SGD', label: 'SGD' },
  { value: 'JPY', label: 'JPY' },
  { value: 'HRK', label: 'HRK' },
  { value: 'BGN', label: 'BGN' },
  { value: 'AUD', label: 'AUD' },
  { value: 'NZD', label: 'NZD' },
  { value: 'CNY', label: 'CNY' },
  { value: 'MXN', label: 'MXN' },
  { value: 'ZAR', label: 'ZAR' },
  { value: 'AED', label: 'AED' },
  { value: 'RON', label: 'RON' },
  { value: 'ILS', label: 'ILS' },
  { value: 'SAR', label: 'SAR' },
  { value: 'MAD', label: 'MAD' },
  { value: 'THB', label: 'THB' },
  { value: 'KRW', label: 'KRW' },
]

export function CurrencyField({ field, value, onChange, onChangeMulti, mode, error, allData }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)
  const { amountKey, currencyKey } = field

  // Flat mode: read amount and currency from separate allData fields
  const isFlat = !!(amountKey && currencyKey)
  const amount: string = isFlat ? String((allData as any)?.[amountKey] ?? '') : (value?.amount ?? '')
  const currency: string = isFlat ? String((allData as any)?.[currencyKey] ?? 'EUR') : (value?.currency ?? 'EUR')

  const [inputValue, setInputValue] = useState(() => formatAmount(amount))

  // Sync formatted display when external value changes
  useEffect(() => {
    setInputValue(formatAmount(amount))
  }, [amount])

  const handleAmountChange = (newAmount: string) => {
    if (isFlat) {
      onChangeMulti?.({ [amountKey!]: newAmount, [currencyKey!]: currency })
    } else {
      onChange({ amount: newAmount, currency })
    }
  }

  const handleCurrencyChange = (newCurrency: string) => {
    if (isFlat) {
      onChangeMulti?.({ [amountKey!]: amount, [currencyKey!]: newCurrency })
    } else {
      onChange({ amount, currency: newCurrency })
    }
  }

  if (readOnly) {
    const displayValue = amount ? `${formatAmount(amount)} ${currency}` : '-'
    return (
      <div className="space-y-2">
        <FieldLabel field={field} />
        <CopyableValue value={displayValue} />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <FieldLabel field={field} htmlFor={field.key}>
        {field.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <div className="flex gap-2">
        <Input
          id={field.key}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => {
            const raw = parseAmount(inputValue)
            handleAmountChange(raw)
            setInputValue(formatAmount(raw))
          }}
          placeholder={field.placeholder || '0.00'}
          className={`flex-1 ${error ? 'border-destructive' : ''}`}
        />
        <Select value={currency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
