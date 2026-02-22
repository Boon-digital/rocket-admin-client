import { createFileRoute, redirect } from '@tanstack/react-router'

// Redirects to /companies (migrated from MOCKDATA_NEW to MOCKDATA)
export const Route = createFileRoute('/servers')({
  beforeLoad: () => {
    throw redirect({ to: '/companies' })
  },
  component: () => null,
})
