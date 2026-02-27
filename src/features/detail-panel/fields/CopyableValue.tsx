import { Copy, Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CopyableValueProps {
  value: string
  className?: string
}

export function CopyableValue({ value, className }: CopyableValueProps) {
  const [copied, setCopied] = useState(false)

  const isEmpty = !value || value === '-'

  const handleCopy = () => {
    if (isEmpty) return
    navigator.clipboard.writeText(value)
    setCopied(true)
    toast.success('Copied to clipboard', { duration: 1500 })
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={cn(
        'group flex items-start gap-1 min-w-0',
        !isEmpty && 'cursor-copy'
      )}
      onClick={handleCopy}
    >
      <p
        className={cn('text-sm text-foreground truncate flex-1 select-none', className)}
        title={value}
      >
        {value}
      </p>
      {!isEmpty && (
        <span className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground mt-px">
          {copied
            ? <Check className="size-3.5" weight="light" />
            : <Copy className="size-3.5" weight="light" />
          }
        </span>
      )}
    </div>
  )
}
