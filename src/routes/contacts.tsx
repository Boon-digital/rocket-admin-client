import { createFileRoute } from '@tanstack/react-router'
import { EntityPage } from '@/components/EntityPage'

export const Route = createFileRoute('/contacts')({
  component: ContactsPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || undefined,
  }),
})

function ContactsPage() {
  const { id } = Route.useSearch()
  return <EntityPage entityKey="contacts" id={id} />
}
