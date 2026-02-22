import { useNavigate } from '@tanstack/react-router'
import { useState, useMemo, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from '@phosphor-icons/react'

import { entityRegistry, type EntityKey } from '@ruben/admin-template-config/registry'
import type { BaseEntity } from '@ruben/admin-template-config/entities/types'
import { extractEntityId } from '@ruben/admin-template-config/entities/types'
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

  const cachedItem = useMemo(() => {
    if (!id) return null
    const queries = queryClient.getQueriesData<{ data: T[] }>({ queryKey: [entityKey] })
    for (const [, queryData] of queries) {
      const match = queryData?.data?.find((item) => extractEntityId(item) === id)
      if (match) return match
    }
    return null
  }, [id, queryClient, entityKey])

  const { data: fetchedItem } = useQuery({
    queryKey: [entityKey, 'detail', id],
    queryFn: async () => api.fetchById(id!),
    enabled: !!id && !isCreateMode && !cachedItem,
  })

  const selectedItem = (cachedItem ?? fetchedItem ?? null) as T | null
  const isPanelOpen = !!id || isCreateMode

  const handleRowClick = (item: T) => {
    setIsCreateMode(false)
    setPanelMode('view')
    navigate({ to: entry.route, search: { id: extractEntityId(item) } })
  }

  const handleAddNew = () => {
    setCopyData(null)
    navigate({ to: entry.route, search: { id: undefined } })
    setIsCreateMode(true)
    setPanelMode('create')
  }

  const handleDuplicate = useCallback((item: T) => {
    const copied = prepareForCopy(item, entityConfig)
    navigate({ to: entry.route, search: { id: undefined } })
    setIsCreateMode(true)
    setPanelMode('create')
    setCopyData(copied)
  }, [navigate, entityConfig, entry.route])

  const columns = useMemo(
    () => columnsFromConfig<T>(entityConfig, { onDuplicate: handleDuplicate }),
    [handleDuplicate, entityConfig],
  )

  const filters = useMemo(() => getFiltersFromConfig(entityConfig), [entityConfig])

  const handleClosePanel = () => {
    setIsCreateMode(false)
    setCopyData(null)
    navigate({ to: entry.route, search: { id: undefined } })
  }

  const handleSave = async (data: T, isNew: boolean) => {
    console.log(`Saving ${entry.name}:`, data, 'isNew:', isNew)
    await new Promise((resolve) => setTimeout(resolve, 500))
    await queryClient.invalidateQueries({ queryKey: [entityKey] })
  }

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
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" weight="light" />
              Add {entry.name}
            </Button>
          }
        />
      </main>

      <DetailPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        data={isCreateMode ? (copyData as T | null) : selectedItem}
        mode={panelMode}
        config={entityConfig}
        onSave={handleSave}
      />
    </div>
  )
}
