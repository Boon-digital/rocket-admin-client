import { useNavigate } from '@tanstack/react-router'
import { useState, useMemo, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { entityRegistry, type EntityKey } from '@boon-digital/rocket-admin-config/registry'
import type { BaseEntity } from '@boon-digital/rocket-admin-config/entities/types'
import { extractEntityId } from '@boon-digital/rocket-admin-config/entities/types'
import { configFactories } from '@/configs'
import { makeEntityApi } from '@/features/entityApi'
import { DataTableServer, getFiltersFromConfig } from '@/components/data-table-server'
import { DetailPanel } from '@/features/detail-panel'
import { columnsFromConfig } from '@/lib/generate-table-columns'
import { prepareForCopy } from '@/features/detail-panel/utils'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'

interface EntityPageProps {
  entityKey: EntityKey
  /** The current ?id= search param value from the route */
  id?: string
}

export function EntityPage<T extends BaseEntity>({ entityKey, id }: EntityPageProps) {
  const entry = entityRegistry[entityKey]
  const navigate = useNavigate()
  const [panelMode, setPanelMode] = useState<'view' | 'edit' | 'create'>('view')
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [copyData, setCopyData] = useState<Partial<T> | null>(null)
  const queryClient = useQueryClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entityConfig = useMemo(() => configFactories[entityKey]() as any, [entityKey])
  const api = useMemo(() => makeEntityApi<T>(entityKey), [entityKey])

  const panelConfig = useMemo(
    () => copyData
      ? { ...entityConfig, titles: { ...entityConfig.titles, create: `Copy of ${entityConfig.title}` } }
      : entityConfig,
    [copyData, entityConfig]
  )

  const { data: fetchedItem } = useQuery({
    queryKey: [entityKey, 'detail', id],
    queryFn: async () => api.fetchById(id!),
    enabled: !!id && !isCreateMode,
  })

  const rawItem = (fetchedItem ?? null) as T | null
  const selectedItem = rawItem ? { ...rawItem, _entityKey: entityKey } as T : null
  const isPanelOpen = !!id || isCreateMode

  const handleRowClick = (item: T) => {
    setIsCreateMode(false)
    setPanelMode('view')
    navigate({ to: entry.route, search: { id: extractEntityId(item) } })
  }

  const buildInitialData = useCallback(() => {
    const data: any = { ...entityConfig.defaultValues }
    for (const section of entityConfig.sections ?? []) {
      const fields = section.rows
        ? section.rows.flatMap((r: any) => r.items.flatMap((item: any) => item.kind === 'group' ? item.fields : [item]))
        : (section.fields ?? [])
      for (const field of fields) {
        if (field.autoGenerateConfig?.generate && !data[field.key]) {
          data[field.key] = field.autoGenerateConfig.generate()
        } else if (field.defaultValue !== undefined && data[field.key] === undefined) {
          data[field.key] = field.defaultValue
        }
      }
    }
    return data
  }, [entityConfig])

  const handleAddNew = () => {
    navigate({ to: entry.route, search: { id: undefined } })
    setIsCreateMode(true)
    setPanelMode('create')
    setCopyData(buildInitialData())
  }

  const handleDuplicate = useCallback(async (item: T) => {
    const baseCopy = prepareForCopy(item, entityConfig) as any

    // Allow entity configs to inject extra duplicate logic (e.g. copying sub-entities)
    const extra = entityConfig.onDuplicate ? await entityConfig.onDuplicate(item, baseCopy) : {}
    const copied = { ...baseCopy, ...extra }

    // Apply auto-generate fields (e.g. fresh confirmationNo)
    const defaults = buildInitialData()
    for (const key of Object.keys(defaults)) {
      if (!copied[key]) copied[key] = defaults[key]
    }

    navigate({ to: entry.route, search: { id: undefined } })
    setIsCreateMode(true)
    setPanelMode('create')
    setCopyData(copied)
  }, [navigate, entityConfig, entry.route, buildInitialData])

  const handleClosePanel = useCallback(() => {
    setIsCreateMode(false)
    setCopyData(null)
    navigate({ to: entry.route, search: { id: undefined } })
  }, [navigate, entry.route])

  const invalidateRelated = useCallback(async () => {
    for (const key of entry.invalidatesOnWrite ?? []) {
      await queryClient.invalidateQueries({ queryKey: [key] })
    }
  }, [entry.invalidatesOnWrite, queryClient])

  const handleSave = useCallback(async (data: T, isNew: boolean) => {
    if (isNew) {
      // Strip UI-only hints before sending to the API
      const { _duplicateReferenceKeys: _, ...payload } = data as any

      // Allow entity configs to handle extra pre-create side effects (e.g. strip _stayCopies)
      const extraPayload: Record<string, any> = {}
      const cleanPayload = { ...payload }
      if (entityConfig.onBeforeCreate) {
        const result = await entityConfig.onBeforeCreate(cleanPayload, extraPayload)
        if (result) Object.assign(cleanPayload, result)
      }

      const created = await api.create(cleanPayload as T)
      const newId = extractEntityId(created)

      // Allow entity configs to run post-create side effects (e.g. create sub-entities)
      if (entityConfig.onAfterCreate) {
        await entityConfig.onAfterCreate(newId, extraPayload, queryClient)
      }

      await queryClient.invalidateQueries({ queryKey: [entityKey] })
      await queryClient.invalidateQueries({ queryKey: [entityKey, 'detail', newId] })
      await invalidateRelated()
      setIsCreateMode(false)
      setCopyData(null)
      setPanelMode('view')
      navigate({ to: entry.route, search: { id: newId } })
    } else {
      const id = extractEntityId(data)
      await api.update(id, data)
      await queryClient.invalidateQueries({ queryKey: [entityKey] })
      await queryClient.invalidateQueries({ queryKey: [entityKey, 'detail', id] })
      await invalidateRelated()
    }
  }, [api, queryClient, entityKey, entityConfig, invalidateRelated, navigate, entry.route])

  const handleDelete = useCallback(async (data: T) => {
    const id = extractEntityId(data)
    if (!confirm(`Delete this ${entry.name}? This cannot be undone.`)) return
    await api.remove(id)
    toast.success(`${entry.name} deleted`)
    await queryClient.invalidateQueries({ queryKey: [entityKey] })
    await invalidateRelated()
    handleClosePanel()
  }, [api, queryClient, entityKey, entry.name, invalidateRelated, handleClosePanel])

  const columns = useMemo(
    () => columnsFromConfig<T>(entityConfig, { onDuplicate: handleDuplicate, onDelete: handleDelete }),
    [handleDuplicate, handleDelete, entityConfig],
  )

  const filters = useMemo(() => getFiltersFromConfig(entityConfig), [entityConfig])

  return (
    <div className="flex flex-1">
      <main className="flex flex-col flex-1 min-h-0 max-h-dvh">
        <PageHeader />
        <DataTableServer
          columns={columns}
          fetchData={api.fetchAll}
          queryKey={entityKey}
          onRowClick={handleRowClick}
          activeRowId={id}
          getRowId={(row) => extractEntityId(row)}
          searchPlaceholder={`Search ${entry.namePlural.toLowerCase()}...`}
          defaultPageSize={20}
          filters={filters}
          headerActions={
            entityConfig.canCreate !== false && (
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" weight="light" />
                Add {entry.name}
              </Button>
            )
          }
        />
      </main>

      <DetailPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        data={isCreateMode ? (copyData as T | null) : selectedItem}
        mode={panelMode}
        config={panelConfig}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
