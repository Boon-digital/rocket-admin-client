import { logout } from '@/hooks/useAuth'
import type { AuthUser } from '@/stores/authStore'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOut } from '@phosphor-icons/react'

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')
}

interface UserAvatarProps {
  user: AuthUser
  isCollapsed: boolean
}

export default function UserAvatar({ user, isCollapsed }: UserAvatarProps) {
  const initials = getInitials(user.name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full overflow-hidden text-nowrap ${isCollapsed ? 'justify-center' : 'justify-start'}`}
        >
          <Avatar className="h-4 w-4 shrink-0">
            <AvatarFallback className="text-[9px]">{initials}</AvatarFallback>
          </Avatar>
          {!isCollapsed && <span className="ml-2 truncate">{user.name}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <SignOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
