import { createFileRoute, redirect } from '@tanstack/react-router'

// Redirects to /hotels (migrated from MOCKDATA_NEW to MOCKDATA)
export const Route = createFileRoute('/_authenticated/domains')({
  beforeLoad: () => {
    throw redirect({ to: '/hotels', search: { id: undefined } })
  },
  component: () => null,
})
