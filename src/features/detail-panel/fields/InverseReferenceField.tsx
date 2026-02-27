import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { FieldRendererProps } from '../types'
import { ReferenceTable } from '@/components/reference-table'
import { FieldLabel } from './FieldLabel'
import { referenceColumnsFromConfig } from '@/lib/generate-table-columns'

export function InverseReferenceField(props: FieldRendererProps) {
  const { field, mode, allData } = props
  const navigate = useNavigate()

  const config = field.inverseReferenceConfig

  if (!config) {
    return <div className="text-destructive">Inverse reference configuration missing</div>
  }

  // Hide in create mode — no entity ID to look up yet
  if (mode === 'create') {
    return null
  }

  // Extract the entity's ID from allData._id directly
  // Handles MongoDB string ID or legacy { $oid: "..." } format
  const rawId = allData?._id
  const entityId = typeof rawId === 'string'
    ? rawId
    : typeof rawId === 'object' && rawId !== null && '$oid' in rawId
      ? rawId.$oid
      : ''

  // Convert TableColumn[] to ColumnDef[]
  const columns = useMemo(
    () => referenceColumnsFromConfig(config.columns ?? []),
    [config.columns]
  )

  const handleRowClick = (row: any) => {
    if (!config.routePath) return
    const rawRowId = row._id
    const rowId = typeof rawRowId === 'string'
      ? rawRowId
      : typeof rawRowId === 'object' && rawRowId !== null && '$oid' in rawRowId
        ? rawRowId.$oid
        : undefined
    if (rowId) {
      navigate({ to: config.routePath, search: { id: rowId } })
    }
  }

  return (
    <div className="space-y-2">
      {!field.hideLabel && <FieldLabel field={field} />}
      <div className=" rounded-md">
        <ReferenceTable
          entityType={config.entityType}
          entityIds={entityId ? [entityId] : []}
          fetchFunction={(ids: string[]) => config.fetchFunction(ids[0])}
          queryKey={config.queryKey}
          columns={columns}
          defaultVisibleColumns={config.defaultVisibleColumns}
          onRowClick={config.routePath ? handleRowClick : undefined}
          emptyMessage={config.emptyMessage || `No ${config.entityType} data`}
          maxHeight={config.maxHeight}
          className=""
        />
      </div>
    </div>
  )
}
