import { createFileRoute } from '@tanstack/react-router'
import { EntityPage } from '@/components/EntityPage'

export const Route = createFileRoute('/servers')({
  component: ServersPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || undefined,
  }),
})

function ServersPage() {
  const { id } = Route.useSearch()
  return <EntityPage entityKey="servers" id={id} />
}
