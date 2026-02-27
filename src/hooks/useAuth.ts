import { useQuery } from '@tanstack/react-query'
import { useAuthStore, type AuthUser } from '@/stores/authStore'

async function fetchCurrentUser(): Promise<AuthUser> {
  const res = await fetch('/auth/me', { credentials: 'include' })
  if (!res.ok) throw new Error('Unauthenticated')
  return res.json()
}

export function useAuth() {
  const setUser = useAuthStore((s) => s.setUser)
  const user = useAuthStore((s) => s.user)

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const data = await fetchCurrentUser()
      setUser(data)
      return data
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    user,
    isLoading: query.isLoading,
    isAuthenticated: query.isSuccess,
    isUnauthenticated: query.isError,
  }
}

export async function logout(): Promise<void> {
  await fetch('/auth/logout', { method: 'POST', credentials: 'include' })
  useAuthStore.getState().setUser(null)
  window.location.href = '/login'
}
