import { createFileRoute } from '@tanstack/react-router'
import { EntityPage } from '@/components/EntityPage'

export const Route = createFileRoute('/domains')({
  component: DomainsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || undefined,
  }),
})

function DomainsPage() {
  const { id } = Route.useSearch()
  return <EntityPage entityKey="domains" id={id} />
}
