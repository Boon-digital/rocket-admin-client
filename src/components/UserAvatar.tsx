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
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { SignOut, Moon, Sun, Palette } from '@phosphor-icons/react'
import type { PrimaryColor } from '@/stores/settingsStore'
import { primaryColors, useSettingsStore } from '@/stores/settingsStore'

const colorNames: Record<PrimaryColor, string> = {
  blue: 'Blue',
  green: 'Green',
  red: 'Red',
  purple: 'Purple',
  orange: 'Orange',
  pink: 'Pink',
  teal: 'Teal',
  black: 'Black',
}

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
  const { theme, primaryColor, setTheme, setPrimaryColor } = useSettingsStore()

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
      <DropdownMenuContent side="right" align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Dark mode toggle */}
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-2 text-sm">
            {theme === 'dark' ? (
              <Moon className="h-4 w-4" weight="light" />
            ) : (
              <Sun className="h-4 w-4" weight="light" />
            )}
            <Label htmlFor="avatar-dark-mode" className="cursor-pointer font-normal">
              Dark mode
            </Label>
          </div>
          <Switch
            id="avatar-dark-mode"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>

        {/* Color picker */}
        <div className="px-2 py-1.5">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Palette className="h-4 w-4" weight="light" />
            <span>Primary color</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(primaryColors) as Array<PrimaryColor>).map((color) => (
              <button
                key={color}
                title={colorNames[color]}
                onClick={() => setPrimaryColor(color)}
                className={`h-5 w-5 rounded-sm transition-transform hover:scale-110 ${primaryColor === color ? 'ring-2 ring-offset-1 ring-foreground' : ''}`}
                style={{ backgroundColor: primaryColors[color] }}
              />
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <SignOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
