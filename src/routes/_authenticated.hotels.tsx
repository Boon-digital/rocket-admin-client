import { createFileRoute } from '@tanstack/react-router'
import { EntityPage } from '@/components/EntityPage'

export const Route = createFileRoute('/_authenticated/hotels')({
  component: HotelsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || undefined,
  }),
})

function HotelsPage() {
  const { id } = Route.useSearch()
  return <EntityPage entityKey="hotels" id={id} />
}
