import type { ColumnDef } from '@tanstack/react-table'
import { Copy, DotsThree } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createTextColumn, createDateColumn, createBadgeColumn, accessorProps, SortableHeader, StaticHeader } from '@/lib/table-column-helpers'
import type { EntityConfig, TableColumn } from '@ruben/admin-template-config/entity-configs/types'

/**
 * Base entity type that supports both ID formats:
 * - MongoDB style: { _id: { $oid: "..." } }
 * - Simple style: { _id: "..." } or { _id: 123 }
 */
export type BaseEntity = {
  _id: string | number | { $oid: string }
}

export interface ColumnOptions<T> {
  onDuplicate?: (row: T) => void
}

function selectColumn<T>(): ColumnDef<T> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
    minSize: 40,
    maxSize: 40,
  }
}

function actionsColumn<T extends BaseEntity>(entityName: string, options?: ColumnOptions<T>): ColumnDef<T> {
  return {
    id: 'actions',
    cell: ({ row }) => {
      const entity = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsThree className="h-4 w-4" weight="light" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {options?.onDuplicate && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  options.onDuplicate!(entity)
                }}
              >
                <Copy className="h-4 w-4 mr-2" weight="light" />
                Duplicate {entityName.toLowerCase()}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    size: 60,
    minSize: 60,
    maxSize: 60,
  }
}

function tableColumnToColumnDef<T>(col: TableColumn): ColumnDef<T> {
  const type = col.type ?? 'text'

  if (type === 'badge') {
    const badgeCol = col as Extract<TableColumn, { type: 'badge' }>
    return createBadgeColumn<T>({
      accessorKey: badgeCol.key,
      header: badgeCol.label,
      variantMap: badgeCol.variantMap,
      ...(badgeCol.size !== undefined && { size: badgeCol.size }),
      ...(badgeCol.minSize !== undefined && { minSize: badgeCol.minSize }),
      sortable: badgeCol.sortable ?? true,
      capitalize: badgeCol.capitalize,
      formatValue: badgeCol.badgeLabels
        ? (value: any) => badgeCol.badgeLabels![value] ?? value
        : undefined,
      icon: badgeCol.icon,
    })
  }

  if (type === 'date') {
    return createDateColumn<T>({
      accessorKey: col.key,
      header: col.label,
      ...(col.size !== undefined && { size: col.size }),
      ...(col.minSize !== undefined && { minSize: col.minSize }),
      sortable: col.sortable ?? true,
      icon: col.icon,
    })
  }

  if (type === 'custom') {
    const customCol = col as Extract<TableColumn, { type: 'custom' }>
    const sortable = customCol.sortable ?? false
    return {
      ...accessorProps<T>(customCol.key),
      header: sortable
        ? ({ column }) => <SortableHeader column={column} label={customCol.label} icon={customCol.icon} />
        : () => <StaticHeader label={customCol.label} icon={customCol.icon} />,
      meta: { label: customCol.label },
      cell: ({ row }) => customCol.cell(row.original),
      enableSorting: sortable,
      ...(customCol.sortingFn && { sortingFn: customCol.sortingFn }),
      ...(customCol.size !== undefined && { size: customCol.size }),
      ...(customCol.minSize !== undefined && { minSize: customCol.minSize }),
    } as ColumnDef<T>
  }

  // Default: text
  const textCol = col as Extract<TableColumn, { type?: 'text' }>
  return createTextColumn<T>({
    accessorKey: textCol.key,
    header: textCol.label,
    ...(textCol.size !== undefined && { size: textCol.size }),
    ...(textCol.minSize !== undefined && { minSize: textCol.minSize }),
    sortable: textCol.sortable ?? true,
    bold: textCol.bold,
    formatValue: textCol.formatValue,
    icon: textCol.icon,
  })
}

/**
 * Generate TanStack Table column definitions from an EntityConfig's columns array.
 */
export function columnsFromConfig<T extends BaseEntity>(
  config: EntityConfig<T>,
  options?: ColumnOptions<T>,
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = [selectColumn<T>()]

  for (const col of config.columns ?? []) {
    columns.push(tableColumnToColumnDef<T>(col))
  }

  columns.push(actionsColumn<T>(config.title, options))

  return columns
}

/**
 * Generate column defs from a TableColumn array (without select/actions).
 * Used for reference tables in detail panels.
 */
export function referenceColumnsFromConfig<T>(cols: TableColumn[]): ColumnDef<T>[] {
  return cols.map((col) => tableColumnToColumnDef<T>(col))
}
