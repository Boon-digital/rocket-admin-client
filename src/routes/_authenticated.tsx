import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import AppSidebar from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    try {
      const res = await fetch('/auth/me', { credentials: 'include' })
      if (!res.ok) throw redirect({ to: '/login' })
    } catch (err: any) {
      if (err?.isRedirect) throw err
      throw redirect({ to: '/login' })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
