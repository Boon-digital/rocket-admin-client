import { createFileRoute, redirect } from '@tanstack/react-router'
import { defaultRoute } from '@boon-digital/rocket-admin-config/appConfig'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: defaultRoute, search: { id: undefined } })
  },
  component: () => null,
})
