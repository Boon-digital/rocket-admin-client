import { createFileRoute } from '@tanstack/react-router'
import { EntityPage } from '@/components/EntityPage'

export const Route = createFileRoute('/_authenticated/companies')({
  component: CompaniesPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || undefined,
  }),
})

function CompaniesPage() {
  const { id } = Route.useSearch()
  return <EntityPage entityKey="companies" id={id} />
}
