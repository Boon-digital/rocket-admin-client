import { useState, useCallback, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Plus } from '@phosphor-icons/react'
import type { FieldRendererProps } from '../types'
import { ReferenceTable } from '@/components/reference-table'
import { EntityModal } from '../components/EntityModal'
import { Button } from '@/components/ui/button'
import { FieldLabel } from './FieldLabel'

export function ReferenceTableField(props: FieldRendererProps) {
  const { field, value, mode, onRequestSave, isDirty, allData } = props
  const queryClient = useQueryClient()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState<any>(null)
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view')
  const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number } | undefined>()

  const lastClickPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const referenceConfig = field.referenceConfig
  const modalConfig = referenceConfig?.modalConfig

  // Handle row click with modal support
  const handleRowClick = useCallback(async (row: any) => {
    if (!modalConfig) {
      referenceConfig?.onRowClick?.(row)
      return
    }

    // If parent is dirty, auto-save first
    if (isDirty && onRequestSave) {
      const saved = await onRequestSave()
      if (!saved) return
    }

    // Fetch full entity data if fetchById is provided
    const idKey = modalConfig.idKey || '_id.$oid'
    const id = idKey.split('.').reduce((obj: any, key: string) => obj?.[key], row)

    if (modalConfig.fetchById && id) {
      try {
        const fullData = await modalConfig.fetchById(id)
        setModalData(fullData)
      } catch {
        toast.error('Failed to load entity data')
        return
      }
    } else {
      setModalData(row)
    }

    setClickOrigin({ ...lastClickPos.current })
    setModalMode('view')
    setModalOpen(true)
  }, [modalConfig, referenceConfig, isDirty, onRequestSave])

  // Handle add button click
  const handleAdd = useCallback(async () => {
    if (!modalConfig) return

    // If parent is dirty, auto-save first
    if (isDirty && onRequestSave) {
      const saved = await onRequestSave()
      if (!saved) return
    }

    // Pre-fill initial data if configured
    const initialData = modalConfig.getInitialData?.(allData) ?? null

    setModalData(initialData)
    setClickOrigin({ ...lastClickPos.current })
    setModalMode('edit') // create mode is triggered by data being null/initial
    setModalOpen(true)
  }, [modalConfig, isDirty, onRequestSave, allData])

  // Handle modal save
  const handleModalSave = useCallback(async (data: any, isNew: boolean) => {
    let newId: string | void

    if (modalConfig?.onSave) {
      newId = await modalConfig.onSave(data, isNew)
    }

    // If a new entity was created and we got an ID back, update the parent
    if (isNew && newId && modalConfig?.onCreated) {
      await modalConfig.onCreated(newId, allData)
    }

    // Invalidate the reference table query to refetch updated data
    if (referenceConfig?.queryKey) {
      queryClient.invalidateQueries({ queryKey: [referenceConfig.queryKey] })
    }
    // Invalidate the parent entity's queries so the panel reloads its embedded
    // data (e.g. staySummaries) after the server sync completes.
    // _entityKey is set by EntityPage on the data object.
    const parentEntityKey = allData?._entityKey
    if (parentEntityKey) {
      queryClient.invalidateQueries({ queryKey: [parentEntityKey] })
    }
  }, [modalConfig, queryClient, referenceConfig?.queryKey, allData])

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
    setModalData(null)
  }, [])

  if (!referenceConfig) {
    return <div className="text-destructive">Reference configuration missing</div>
  }

  // Extract array of IDs from value
  const ids = Array.isArray(value) ? value : value ? [value] : []

  // Hide in create mode by default (no data to reference yet)
  if (mode === 'create' && !field.showInMode?.includes('create')) {
    // Show informational message when duplicating with copied reference data
    const duplicateKeys: string[] = allData?._duplicateReferenceKeys ?? []
    if (duplicateKeys.includes(field.key)) {
      const entityLabel = referenceConfig.entityType ?? 'Items'
      const label = entityLabel.charAt(0).toUpperCase() + entityLabel.slice(1)
      return (
        <div className="space-y-2">
          {!field.hideLabel && <FieldLabel field={field} />}
          <p className="text-sm text-foreground">
            {label} copied! {label} will be visible after creating the copy.
          </p>
        </div>
      )
    }
    return null
  }

  // Reference tables are read-only, so we show them in view/edit modes
  if (mode === 'view' || mode === 'edit') {
    const {
      entityType,
      fetchFunction,
      getInlineData,
      inlineIdField = 'id',
      columns,
      queryKey,
      onRowClick,
      emptyMessage,
      maxHeight,
    } = referenceConfig

    // When getInlineData is configured, use embedded rows directly (no fetch).
    // Derive entity IDs from the inline rows for the query-cache key.
    const inlineRows = getInlineData ? getInlineData(allData) : undefined
    const entityIds = inlineRows
      ? inlineRows.map((row: any) => row[inlineIdField]).filter(Boolean)
      : ids

    return (
      <div className="space-y-2" onClickCapture={(e) => { lastClickPos.current = { x: e.clientX, y: e.clientY } }}>
        {!field.hideLabel && <FieldLabel field={field} />}
        <ReferenceTable
          entityType={entityType}
          entityIds={entityIds}
          fetchFunction={fetchFunction}
          queryKey={queryKey}
          inlineData={inlineRows}
          columns={columns}
          onRowClick={modalConfig ? handleRowClick : onRowClick}
          emptyMessage={emptyMessage || `No ${entityType} data`}
          maxHeight={maxHeight}
        />

        {modalConfig?.canAdd && (
          <Button variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" weight="light" />
            Add {referenceConfig.entityType}
          </Button>
        )}

        {modalConfig && (
          <EntityModal
            isOpen={modalOpen}
            onClose={handleModalClose}
            data={modalData}
            config={modalConfig.entityConfig}
            onSave={handleModalSave}
            defaultMode={modalMode}
            originPoint={clickOrigin}
          />
        )}
      </div>
    )
  }

  return null
}
