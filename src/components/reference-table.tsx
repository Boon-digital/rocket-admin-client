import { useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnOrderState,
  type SortingState,
} from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DotsSixVertical, SlidersHorizontal } from '@phosphor-icons/react'
import { Skeleton } from '@/components/ui/skeleton'

export interface ReferenceTableProps<TData> {
  // Entity configuration
  entityType: string
  entityIds: string[]

  // Data fetching
  fetchFunction: (ids: string[]) => Promise<TData[]>
  queryKey: string

  /**
   * Optional pre-loaded data. When provided, the fetch is skipped entirely
   * and this data is rendered directly. entityIds is still used as the
   * query-cache key so invalidation works correctly.
   */
  inlineData?: TData[]

  // Column configuration
  columns: Array<ColumnDef<TData>>

  // Interaction
  onRowClick?: (row: TData) => void
  emptyMessage?: string

  // Styling
  maxHeight?: string
  className?: string
}

export function ReferenceTable<TData>({
  entityType,
  entityIds,
  fetchFunction,
  queryKey,
  inlineData,
  columns,
  onRowClick,
  emptyMessage = 'No related items',
  maxHeight,
  className = '',
}: ReferenceTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>(() => {
    try {
      const stored = localStorage.getItem(`referenceTable-${queryKey}-sorting`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(() => {
    try {
      const stored = localStorage.getItem(`referenceTable-${queryKey}-columnOrder`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Save column order to localStorage
  useEffect(() => {
    if (columnOrder.length > 0) {
      localStorage.setItem(`referenceTable-${queryKey}-columnOrder`, JSON.stringify(columnOrder))
    }
  }, [columnOrder, queryKey])

  // Save sorting to localStorage
  useEffect(() => {
    localStorage.setItem(`referenceTable-${queryKey}-sorting`, JSON.stringify(sorting))
  }, [sorting, queryKey])

  // Fetch referenced data — skipped when inlineData is provided
  const { data: fetchedItems = [], isLoading, error } = useQuery({
    queryKey: [queryKey, entityIds],
    queryFn: () => fetchFunction(entityIds),
    enabled: entityIds.length > 0 && !inlineData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const items = inlineData ?? fetchedItems

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    state: {
      sorting,
      columnOrder: columnOrder.length > 0 ? ['select', ...columnOrder.filter((id) => id !== 'select')] : columnOrder,
    },
  })

  // Empty state — for inline data check items directly; for fetched data check entityIds
  if (inlineData ? items.length === 0 : entityIds.length === 0) {
    return (
      <div className="rounded-md border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  // Loading state (never shown when inlineData is provided)
  if (!inlineData && isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  // Error state (never shown when inlineData is provided)
  if (!inlineData && error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        Failed to load related {entityType} data
      </div>
    )
  }

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {/* Column Customization */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </div>
        <ReferenceColumnSettingsPopover
          columns={columns}
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
        />
      </div>

      {/* Table */}
      <div
        className="rounded-md border overflow-auto w-full"
        style={{ maxHeight }}
      >
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-background z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={onRowClick ? 'cursor-pointer' : ''}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function SortableReferenceColumnItem({ id, label }: {
  id: string
  label: string
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-1 rounded-sm px-1 py-1.5 text-sm capitalize hover:bg-accent"
    >
      <button
        type="button"
        className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <DotsSixVertical className="h-4 w-4" weight="light" />
      </button>
      <span className="flex-1">{label}</span>
    </div>
  )
}

function ReferenceColumnSettingsPopover<TData>({ columns, columnOrder, onColumnOrderChange }: {
  columns: Array<ColumnDef<TData>>
  columnOrder: ColumnOrderState
  onColumnOrderChange: (order: ColumnOrderState) => void
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const columnItems = columns.map((col) => {
    const id = ('accessorKey' in col ? col.accessorKey : col.id) as string
    const label = typeof col.header === 'string'
      ? col.header
      : (col.meta as any)?.label ?? id
    return { id, label }
  })

  const orderedItems = columnOrder.length > 0
    ? [...columnItems].sort((a, b) => {
        const aIdx = columnOrder.indexOf(a.id)
        const bIdx = columnOrder.indexOf(b.id)
        if (aIdx === -1 && bIdx === -1) return 0
        if (aIdx === -1) return 1
        if (bIdx === -1) return -1
        return aIdx - bIdx
      })
    : columnItems
  const columnIds = orderedItems.map((c) => c.id)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = columnIds.indexOf(active.id as string)
    const newIndex = columnIds.indexOf(over.id as string)
    const newOrder = arrayMove(columnIds, oldIndex, newIndex)
    onColumnOrderChange(newOrder)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <SlidersHorizontal className="h-4 w-4" weight="light" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52 p-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={columnIds} strategy={verticalListSortingStrategy}>
            {orderedItems.map((item) => (
              <SortableReferenceColumnItem
                key={item.id}
                id={item.id}
                label={item.label}
              />
            ))}
          </SortableContext>
        </DndContext>
      </PopoverContent>
    </Popover>
  )
}
