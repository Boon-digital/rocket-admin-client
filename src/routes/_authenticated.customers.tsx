import { createFileRoute, redirect } from '@tanstack/react-router'

// Redirects to /contacts (migrated from MOCKDATA_NEW to MOCKDATA)
export const Route = createFileRoute('/_authenticated/customers')({
  beforeLoad: () => {
    throw redirect({ to: '/contacts', search: { id: undefined } })
  },
  component: () => null,
})
