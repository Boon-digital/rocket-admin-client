import type { VariantProps } from "class-variance-authority"
import type { badgeVariants } from "@/components/ui/badge"

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

/**
 * Helper type for mapping values to badge variants
 */
export type BadgeVariantMap = Record<string, BadgeVariant>

/**
 * Get a badge variant for a value, with fallback to default
 */
export function getBadgeVariant(
  value: string | undefined,
  variantMap: BadgeVariantMap,
  fallback: BadgeVariant = 'default'
): BadgeVariant {
  if (!value) return fallback
  return variantMap[value.toLowerCase()] || fallback
}

/**
 * Predefined badge variant maps for common use cases
 */
export const COMMON_BADGE_MAPS = {
  // Status mappings
  status: {
    pending: 'warning',
    confirmed: 'success',
    completed: 'secondary',
    cancelled: 'destructive',
    active: 'success',
    inactive: 'outline',
    archived: 'secondary',
  },

  // Priority mappings
  priority: {
    low: 'secondary',
    medium: 'warning',
    high: 'orange',
    urgent: 'destructive',
  },

  // Boolean-like mappings
  boolean: {
    yes: 'success',
    no: 'outline',
    true: 'success',
    false: 'outline',
  },

  // Payment status
  payment: {
    paid: 'success',
    unpaid: 'warning',
    overdue: 'destructive',
    pending: 'outline',
    refunded: 'secondary',
  },
} as const
