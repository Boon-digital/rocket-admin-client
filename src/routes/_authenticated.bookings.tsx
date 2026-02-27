import { createFileRoute } from '@tanstack/react-router'
import { EntityPage } from '@/components/EntityPage'

export const Route = createFileRoute('/_authenticated/bookings')({
  component: BookingsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || undefined,
  }),
})

function BookingsPage() {
  const { id } = Route.useSearch()
  return <EntityPage entityKey="bookings" id={id} />
}
