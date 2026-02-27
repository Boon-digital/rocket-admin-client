import { createFileRoute } from '@tanstack/react-router'
import { EntityPage } from '@/components/EntityPage'

export const Route = createFileRoute('/_authenticated/stays')({
  component: StaysPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || undefined,
  }),
})

function StaysPage() {
  const { id } = Route.useSearch()
  return <EntityPage entityKey="stays" id={id} />
}
