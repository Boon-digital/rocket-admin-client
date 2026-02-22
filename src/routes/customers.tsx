import { createFileRoute, redirect } from '@tanstack/react-router'

// Redirects to /contacts (migrated from MOCKDATA_NEW to MOCKDATA)
export const Route = createFileRoute('/customers')({
  beforeLoad: () => {
    throw redirect({ to: '/contacts' })
  },
  component: () => null,
})
