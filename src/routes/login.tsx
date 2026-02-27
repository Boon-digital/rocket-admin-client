import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPanel } from '@/components/LoginCard'
import ThemeProvider from '@/components/ThemeProvider'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    try {
      const res = await fetch('/auth/me', { credentials: 'include' })
      if (res.ok) throw redirect({ to: '/' })
    } catch (err: any) {
      if (err?.isRedirect) throw err
    }
  },
  component: LoginPage,
})

function LoginPage() {
  return (
    <ThemeProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-background">
        <LoginPanel />
      </div>
    </ThemeProvider>
  )
}
