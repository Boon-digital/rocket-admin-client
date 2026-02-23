import type { Column, ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowsDownUp } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { TableBadgeCell } from '@/components/table-badge-cell'
import type { BadgeVariantMap } from '@/lib/badge-utils'
import { getIcon } from '@/lib/icons'

/** Resolve a dot-separated key path on an object, e.g. "general.firstName" */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

/**
 * Build accessor props for a column definition.
 * For simple keys (no dots) we use `accessorKey`.
 * For nested keys (dots) we use `accessorFn` + explicit `id` so
 * `row.getValue(id)` works correctly in cell renderers.
 */
export function accessorProps<T>(key: string): Record<string, any> {
  if (key.includes('.')) {
    return {
      id: key,
      accessorFn: (row: T) => getNestedValue(row, key),
    }
  }
  return { accessorKey: key }
}

export function SortableHeader<TData>({ column, label, icon }: { column: Column<TData>; label: string; icon?: string }) {
  const sorted = column.getIsSorted()
  const IconComponent = icon ? getIcon(icon) : null
  return (
    <Button
      variant="ghost"
      className="!px-0"
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      {IconComponent && <IconComponent className="mr-1.5 h-4 w-4 text-muted-foreground" weight="light" />}
      {label}
      {sorted === 'asc' ? (
        <ArrowUp className="ml-2 h-4 w-4 text-primary" weight="light" />
      ) : sorted === 'desc' ? (
        <ArrowDown className="ml-2 h-4 w-4 text-primary" weight="light" />
      ) : (
        <ArrowsDownUp className="ml-2 h-4 w-4 text-muted-foreground/50" weight="light" />
      )}
    </Button>
  )
}

export function StaticHeader({ label, icon }: { label: string; icon?: string }) {
  const IconComponent = icon ? getIcon(icon) : null
  if (!IconComponent) return label
  return (
    <div className="flex items-center gap-1.5">
      <IconComponent className="h-4 w-4 text-muted-foreground" weight="light" />
      {label}
    </div>
  )
}

interface CreateBadgeColumnOptions<TData> {
  /** The key to access the value in the data object */
  accessorKey: string
  /** The header label to display */
  header: string
  /** Badge variant mapping for different values */
  variantMap: BadgeVariantMap
  /** Column size in pixels */
  size?: number
  /** Minimum column size in pixels */
  minSize?: number
  /** Enable sorting on this column */
  sortable?: boolean
  /** Capitalize the first letter of the value */
  capitalize?: boolean
  /** Custom value formatter */
  formatValue?: (value: any) => string
  /** Icon name */
  icon?: string
}

/**
 * Helper function to create a badge column definition for tables
 * Simplifies the process of adding badge-styled columns
 *
 * @example
 * const statusColumn = createBadgeColumn({
 *   accessorKey: 'status',
 *   header: 'Status',
 *   variantMap: {
 *     pending: 'warning',
 *     confirmed: 'success',
 *   },
 *   sortable: true,
 * })
 */
export function createBadgeColumn<TData>({
  accessorKey,
  header,
  variantMap,
  size = 120,
  minSize = 100,
  sortable = true,
  capitalize = false,
  formatValue,
  icon,
}: CreateBadgeColumnOptions<TData>): ColumnDef<TData> {
  return {
    ...accessorProps<TData>(accessorKey),
    header: sortable
      ? ({ column }) => <SortableHeader column={column} label={header} icon={icon} />
      : () => <StaticHeader label={header} icon={icon} />,
    meta: { label: header },
    cell: ({ row }) => {
      const rawValue = row.getValue(accessorKey)
      // Convert boolean/number values to strings for badge display
      const stringValue = rawValue != null ? String(rawValue) : undefined
      const displayValue = formatValue && rawValue != null ? formatValue(rawValue) : stringValue

      return (
        <TableBadgeCell
          value={stringValue}
          displayValue={displayValue}
          variantMap={variantMap}
          capitalize={capitalize}
        />
      )
    },
    size,
    minSize,
  } as ColumnDef<TData>
}

interface CreateTextColumnOptions<TData> {
  /** The key to access the value in the data object */
  accessorKey: string
  /** The header label to display */
  header: string
  /** Column size in pixels */
  size?: number
  /** Minimum column size in pixels */
  minSize?: number
  /** Enable sorting on this column */
  sortable?: boolean
  /** Show as bold/medium font weight */
  bold?: boolean
  /** Fallback text when value is empty */
  fallback?: string
  /** Custom value formatter */
  formatValue?: (value: any) => string
  /** Icon name */
  icon?: string
}

/**
 * Helper function to create a standard text column definition for tables
 *
 * @example
 * const nameColumn = createTextColumn({
 *   accessorKey: 'name',
 *   header: 'Name',
 *   bold: true,
 *   sortable: true,
 * })
 */
export function createTextColumn<TData>({
  accessorKey,
  header,
  size = 200,
  minSize = 150,
  sortable = true,
  bold = false,
  fallback = '-',
  formatValue,
  icon,
}: CreateTextColumnOptions<TData>): ColumnDef<TData> {
  return {
    ...accessorProps<TData>(accessorKey),
    header: sortable
      ? ({ column }) => <SortableHeader column={column} label={header} icon={icon} />
      : () => <StaticHeader label={header} icon={icon} />,
    meta: { label: header },
    cell: ({ row }) => {
      let value = row.getValue(accessorKey)

      // Handle objects (including empty objects) - convert to string or use fallback
      if (value !== null && typeof value === 'object') {
        value = Object.keys(value).length > 0 ? JSON.stringify(value) : undefined
      }

      if (formatValue && value) {
        value = formatValue(value)
      }

      const displayValue = value || fallback

      return (
        <div className={`truncate ${bold ? 'font-medium' : ''}`}>
          {displayValue}
        </div>
      )
    },
    size,
    minSize,
  } as ColumnDef<TData>
}

interface CreateDateColumnOptions<TData> {
  /** The key to access the value in the data object */
  accessorKey: string
  /** The header label to display */
  header: string
  /** Column size in pixels */
  size?: number
  /** Minimum column size in pixels */
  minSize?: number
  /** Enable sorting on this column */
  sortable?: boolean
  /** Date format options */
  dateFormat?: Intl.DateTimeFormatOptions
  /** Icon name */
  icon?: string
}

/**
 * Helper function to create a date column definition for tables
 *
 * @example
 * const createdAtColumn = createDateColumn({
 *   accessorKey: 'createdAt',
 *   header: 'Created',
 *   sortable: true,
 * })
 */
export function createDateColumn<TData>({
  accessorKey,
  header,
  size = 150,
  minSize = 120,
  sortable = true,
  dateFormat,
  icon,
}: CreateDateColumnOptions<TData>): ColumnDef<TData> {
  return {
    ...accessorProps<TData>(accessorKey),
    header: sortable
      ? ({ column }) => <SortableHeader column={column} label={header} icon={icon} />
      : () => <StaticHeader label={header} icon={icon} />,
    meta: { label: header },
    cell: ({ row }) => {
      const value = row.getValue(accessorKey) as string | undefined

      if (!value) {
        return <div className="text-sm text-muted-foreground">-</div>
      }

      const date = new Date(value)
      const formatted = dateFormat
        ? date.toLocaleDateString(undefined, dateFormat)
        : date.toLocaleDateString()

      return <div className="text-sm">{formatted}</div>
    },
    size,
    minSize,
  } as ColumnDef<TData>
}
