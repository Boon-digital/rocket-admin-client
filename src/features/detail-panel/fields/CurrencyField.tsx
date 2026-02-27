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

interface CurrencyValue {
  amount: string
  currency: string
}

export function CurrencyField({ field, value, onChange, mode, error }: FieldRendererProps) {
  const readOnly = isFieldReadOnly(field, mode)

  // Parse the value - it should be an object with amount and currency
  const currencyValue: CurrencyValue = value || { amount: '', currency: 'EUR' }

  const handleAmountChange = (newAmount: string) => {
    onChange({
      ...currencyValue,
      amount: newAmount,
    })
  }

  const handleCurrencyChange = (newCurrency: string) => {
    onChange({
      ...currencyValue,
      currency: newCurrency,
    })
  }

  if (readOnly) {
    const displayValue = currencyValue.amount
      ? `${currencyValue.amount} ${currencyValue.currency}`
      : '-'

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
          value={currencyValue.amount || ''}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder={field.placeholder || 'Enter amount'}
          className={`flex-1 ${error ? 'border-destructive' : ''}`}
        />
        <Select
          value={currencyValue.currency || 'EUR'}
          onValueChange={handleCurrencyChange}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
