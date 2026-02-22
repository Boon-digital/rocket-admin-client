import { useNavigate } from '@tanstack/react-router'
import type { FieldRendererProps } from '../types'
import { ReferenceTable } from '@/components/reference-table'
import { FieldLabel } from './FieldLabel'

export function InverseReferenceField(props: FieldRendererProps) {
  const { field, value, mode } = props
  const navigate = useNavigate()

  const config = field.inverseReferenceConfig

  if (!config) {
    return <div className="text-destructive">Inverse reference configuration missing</div>
  }

  // Hide in create mode — no entity ID to look up yet
  if (mode === 'create') {
    return null
  }

  // Extract the current entity's ID from the value
  const entityId = typeof value === 'string' ? value : ''

  const handleRowClick = (row: any) => {
    if (!config.routePath) return
    const idKey = config.idKey || '_id.$oid'
    const rowId = idKey.split('.').reduce((obj: any, key: string) => obj?.[key], row)
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
          columns={config.columns}
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
