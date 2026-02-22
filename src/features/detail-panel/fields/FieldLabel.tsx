import { getIcon } from '@/lib/icons'
import { Label } from '@/components/ui/label'
import type { FieldConfig } from '../types'

interface FieldLabelProps {
  field: FieldConfig
  htmlFor?: string
  children?: React.ReactNode // extra content like required asterisk
}

export function FieldLabel({ field, htmlFor, children }: FieldLabelProps) {
  const IconComponent = field.icon ? getIcon(field.icon) : null

  return (
    <Label htmlFor={htmlFor} className={IconComponent ? 'flex items-center gap-1.5' : undefined}>
      {IconComponent && <IconComponent className="size-4 text-muted-foreground" weight="light" />}
      {field.label}
      {children}
    </Label>
  )
}
