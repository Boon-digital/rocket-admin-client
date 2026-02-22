import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar as CalendarIcon, Download, DotsSixVertical, CircleNotch, ArrowCounterClockwise, MagnifyingGlass, SlidersHorizontal, X } from '@phosphor-icons/react'
import { format } from 'date-fns'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type {
  ColumnDef,
  ColumnOrderState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import type { DateRange } from 'react-day-picker'
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

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface SelectFilter {
  type: 'select'
  columnId: string
  label: string
  options: Array<{ label: string; value: string }>
}

interface DateRangeFilter {
  type: 'dateRange'
  columnId: string
  label: string
}

type ColumnFilter = SelectFilter | DateRangeFilter

interface DateRangeValue {
  from: string
  to: string
}

interface FetchParams {
  page: number
  pageSize: number
  search: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
  dateFilters?: Record<string, DateRangeValue>
}

interface FetchResponse<TData> {
  data: Array<TData>
  pageCount: number
  totalRows: number
}

interface DataTableServerProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  fetchData: (params: FetchParams) => Promise<FetchResponse<TData>>
  queryKey: string
  onRowClick?: (row: TData) => void
  searchPlaceholder?: string
  defaultPageSize?: number
  headerActions?: React.ReactNode
  filters?: Array<ColumnFilter>
  activeRowId?: string
  getRowId?: (row: TData) => string
}

export function DataTableServer<TData, TValue>({
  columns,
  fetchData,
  queryKey,
  onRowClick,
  searchPlaceholder = 'Search...',
  defaultPageSize = 10,
  headerActions,
  filters = [],
  activeRowId,
  getRowId,
}: DataTableServerProps<TData, TValue>) {
  // Build set of valid column IDs from the columns prop
  const validColumnIds = useMemo(() => {
    const ids = new Set<string>()
    for (const col of columns) {
      const id = (col as any).id ?? (col as any).accessorKey
      if (id) ids.add(String(id))
    }
    return ids
  }, [columns])

  const [sorting, setSorting] = useState<SortingState>(() => {
    try {
      const stored = localStorage.getItem(`table-sorting:${queryKey}`)
      if (!stored) return []
      const parsed = JSON.parse(stored) as SortingState
      // Filter out sorting for columns that no longer exist
      return parsed.filter((s) => validColumnIds.has(s.id))
    } catch {
      return []
    }
  })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    try {
      const stored = localStorage.getItem(`table-columns:${queryKey}`)
      if (!stored) return {}
      const parsed = JSON.parse(stored) as VisibilityState
      // Filter out visibility state for columns that no longer exist
      const cleaned: VisibilityState = {}
      for (const [key, value] of Object.entries(parsed)) {
        if (validColumnIds.has(key)) cleaned[key] = value
      }
      return cleaned
    } catch {
      return {}
    }
  })
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(() => {
    try {
      const stored = localStorage.getItem(`table-column-order:${queryKey}`)
      if (!stored) return []
      const parsed = JSON.parse(stored) as ColumnOrderState
      // Filter out column IDs that no longer exist
      const filtered = parsed.filter((id) => validColumnIds.has(id))
      // If the filtered list lost columns, reset to empty (let table use default order)
      return filtered.length === parsed.length ? filtered : []
    } catch {
      return []
    }
  })
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [debouncedFilter, setDebouncedFilter] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [activeDateFilters, setActiveDateFilters] = useState<Record<string, DateRangeValue>>({})
  const [filterResetKey, setFilterResetKey] = useState(0)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  })

  useEffect(() => {
    localStorage.setItem(`table-columns:${queryKey}`, JSON.stringify(columnVisibility))
  }, [columnVisibility, queryKey])

  useEffect(() => {
    localStorage.setItem(`table-sorting:${queryKey}`, JSON.stringify(sorting))
  }, [sorting, queryKey])

  useEffect(() => {
    if (columnOrder.length > 0) {
      localStorage.setItem(`table-column-order:${queryKey}`, JSON.stringify(columnOrder))
    }
  }, [columnOrder, queryKey])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilter(globalFilter)
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    }, 300)
    return () => clearTimeout(timeout)
  }, [globalFilter])

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, debouncedFilter, pagination.pageIndex, pagination.pageSize, sorting, activeFilters, activeDateFilters],
    queryFn: () =>
      fetchData({
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        search: debouncedFilter,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
        filters: activeFilters,
        dateFilters: activeDateFilters,
      }),
    placeholderData: (previousData) => previousData,
  })

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.pageCount ?? -1,
    state: { sorting, columnVisibility, columnOrder: columnOrder.length > 0 ? ['select', ...columnOrder.filter((id) => id !== 'select')] : columnOrder, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  const [isExporting, setIsExporting] = useState(false)

  const handleExportCsv = useCallback(async () => {
    setIsExporting(true)
    try {
      const allData = await fetchData({
        page: 0,
        pageSize: 999999,
        search: debouncedFilter,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
        filters: activeFilters,
        dateFilters: activeDateFilters,
      })

      const visibleColumns = table.getVisibleLeafColumns().filter((col) => col.id !== 'select' && col.id !== 'actions')
      const headers = visibleColumns.map((col) => col.id)

      const escapeCsv = (value: unknown): string => {
        const str = value == null ? '' : String(value)
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }

      const rows = allData.data.map((row) =>
        visibleColumns.map((col) => {
          const value = (row as Record<string, unknown>)[col.id]
          return escapeCsv(value)
        }).join(','),
      )

      const csv = [headers.map(escapeCsv).join(','), ...rows].join('\n')
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const date = format(new Date(), 'yyyy-MM-dd')
      link.href = url
      link.download = `${queryKey}-export-${date}.csv`
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsExporting(false)
    }
  }, [fetchData, debouncedFilter, sorting, activeFilters, activeDateFilters, table, queryKey])

  const hasActiveFilters = Object.keys(activeFilters).length > 0 || Object.keys(activeDateFilters).length > 0 || globalFilter !== ''
  const tableColumnIds = new Set(table.getAllColumns().map((c) => c.id))
  const visibleFilters = filters.filter(
    (f) => tableColumnIds.has(f.columnId) && columnVisibility[f.columnId] !== false,
  )

  return (
    <div className="@container flex-1 min-w-0 min-h-0 flex flex-col p-6 gap-4 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center gap-4 shrink-0">
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" weight="light" />
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>
        {visibleFilters.length > 0 && (
          <div className="hidden @3xl:inline-flex items-center">
            {visibleFilters.map((filter, index) => {
              const isFirst = index === 0
              const isLast = index === visibleFilters.length - 1 && !hasActiveFilters
              const roundedClass = cn(
                !isFirst && '-ml-px rounded-l-none',
                !isLast && 'rounded-r-none',
              )

              return filter.type === 'select' ? (
                <Select
                  key={filter.columnId}
                  value={activeFilters[filter.columnId] ?? 'all'}
                  onValueChange={(value) => {
                    setActiveFilters((prev) => {
                      if (value === 'all') {
                        const { [filter.columnId]: _, ...rest } = prev
                        return rest
                      }
                      return { ...prev, [filter.columnId]: value }
                    })
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                  }}
                >
                  <SelectTrigger className={cn('h-9 w-auto', roundedClass)}>
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {filter.label}</SelectItem>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <DateRangeFilterButton
                  key={`${filter.columnId}-${filterResetKey}`}
                  filter={filter}
                  value={activeDateFilters[filter.columnId]}
                  className={roundedClass}
                  onChange={(range) => {
                    setActiveDateFilters((prev) => {
                      if (!range) {
                        const { [filter.columnId]: _, ...rest } = prev
                        return rest
                      }
                      return { ...prev, [filter.columnId]: range }
                    })
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                  }}
                />
              )
            })}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="-ml-px rounded-l-none h-9 gap-1"
                onClick={() => {
                  setActiveFilters({})
                  setActiveDateFilters({})
                  setGlobalFilter('')
                  setFilterResetKey((k) => k + 1)
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                }}
              >
                <ArrowCounterClockwise className="h-3 w-3" weight="light" />
                Reset
              </Button>
            )}
          </div>
        )}
        {isLoading && <CircleNotch className="h-4 w-4 animate-spin" weight="light" />}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <div className="inline-flex">
            <Button variant="outline" className="rounded-r-none" onClick={handleExportCsv} disabled={isExporting}>
              {isExporting ? <CircleNotch className="h-4 w-4 animate-spin" weight="light" /> : <Download className="h-4 w-4" weight="light" />}
            </Button>
            <ColumnSettingsPopover
              table={table}
              columnOrder={columnOrder}
              onColumnOrderChange={setColumnOrder}
              buttonClassName="rounded-l-none -ml-px"
            />
          </div>
          {headerActions}
        </div>
      </div>
      <Table style={{ tableLayout: 'fixed', width: '100%' }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: header.getSize() }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex items-center justify-center gap-2">
                  <CircleNotch className="h-6 w-6 animate-spin" weight="light" />
                  <span>Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                Error loading data
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const isActive = activeRowId != null && getRowId != null && getRowId(row.original) === activeRowId
              return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : isActive ? 'selected' : undefined}
                onClick={() => onRowClick?.(row.original)}
                className={onRowClick ? 'cursor-pointer' : ''}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className="truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between py-4 shrink-0">
        <div className="hidden @3xl:flex flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {data?.totalRows ?? 0} row(s) selected.
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden @2xl:flex items-center gap-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm font-medium">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="inline-flex">
            <Button
              variant="outline"
              size="sm"
              className="rounded-r-none"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isLoading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-l-none -ml-px"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SortableColumnItem({ id, label, isVisible, onToggleVisibility }: {
  id: string
  label: string
  isVisible: boolean
  onToggleVisibility: (value: boolean) => void
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
      <label className="flex items-center gap-2 cursor-pointer flex-1">
        <Checkbox
          checked={isVisible}
          onCheckedChange={(value) => onToggleVisibility(!!value)}
        />
        {label}
      </label>
    </div>
  )
}

function ColumnSettingsPopover<TData>({ table, columnOrder, onColumnOrderChange, buttonClassName }: {
  table: ReturnType<typeof useReactTable<TData>>
  columnOrder: ColumnOrderState
  onColumnOrderChange: (order: ColumnOrderState) => void
  buttonClassName?: string
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const hideable = table.getAllColumns().filter((column) => column.getCanHide())
  const orderedColumns = columnOrder.length > 0
    ? [...hideable].sort((a, b) => {
        const aIdx = columnOrder.indexOf(a.id)
        const bIdx = columnOrder.indexOf(b.id)
        if (aIdx === -1 && bIdx === -1) return 0
        if (aIdx === -1) return 1
        if (bIdx === -1) return -1
        return aIdx - bIdx
      })
    : hideable
  const columnIds = orderedColumns.map((c) => c.id)

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
        <Button variant="outline" className={buttonClassName}>
          <SlidersHorizontal className="h-4 w-4" weight="light" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52 p-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={columnIds} strategy={verticalListSortingStrategy}>
            {orderedColumns.map((column) => {
              const label = (column.columnDef.meta as any)?.label ?? column.id
              return (
                <SortableColumnItem
                  key={column.id}
                  id={column.id}
                  label={label}
                  isVisible={column.getIsVisible()}
                  onToggleVisibility={(value) => column.toggleVisibility(value)}
                />
              )
            })}
          </SortableContext>
        </DndContext>
      </PopoverContent>
    </Popover>
  )
}

function DateRangeFilterButton({
  filter,
  value,
  onChange,
  className,
}: {
  filter: DateRangeFilter
  value?: DateRangeValue
  onChange: (range: DateRangeValue | null) => void
  className?: string
}) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    value ? { from: new Date(value.from), to: new Date(value.to) } : undefined,
  )

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range)
    if (range?.from && range.to) {
      onChange({
        from: format(range.from, 'yyyy-MM-dd'),
        to: format(range.to, 'yyyy-MM-dd'),
      })
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDateRange(undefined)
    onChange(null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'h-9 gap-2 font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="h-4 w-4" weight="light" />
          {value
            ? `${format(new Date(value.from), 'MMM d')} - ${format(new Date(value.to), 'MMM d')}`
            : filter.label}
          {value && (
            <X
              className="h-3 w-3 opacity-50 hover:opacity-100"
              weight="light"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export function getFiltersFromConfig(config: { sections: Array<{ fields?: Array<{ key: string; label: string; type: string; options?: Array<{ label: string; value: string }> }>; rows?: Array<{ items: Array<any> }> }> }): Array<ColumnFilter> {
  return config.sections.flatMap((section) => {
    // Collect all fields from either flat fields or row-based layout
    const allFields: Array<{ key: string; label: string; type: string; options?: Array<{ label: string; value: string }> }> = []
    if (section.rows) {
      for (const row of section.rows) {
        for (const item of row.items) {
          if (item.kind === 'group') {
            allFields.push(...item.fields)
          } else {
            allFields.push(item)
          }
        }
      }
    } else if (section.fields) {
      allFields.push(...section.fields)
    }
    return allFields
      .filter((field) => (field.type === 'select' && field.options) || field.type === 'date')
      .map((field): ColumnFilter => {
        if (field.type === 'select') {
          return { type: 'select', columnId: field.key, label: field.label, options: field.options! }
        }
        return { type: 'dateRange', columnId: field.key, label: field.label }
      })
  })
}

export type { FetchParams, FetchResponse, ColumnFilter, DateRangeValue }
