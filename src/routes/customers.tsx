import { createFileRoute } from '@tanstack/react-router'
import { EntityPage } from '@/components/EntityPage'

export const Route = createFileRoute('/customers')({
  component: CustomersPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || undefined,
  }),
})

function CustomersPage() {
  const { id } = Route.useSearch()
  return <EntityPage entityKey="customers" id={id} />
}
