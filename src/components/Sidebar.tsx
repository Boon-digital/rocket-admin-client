import { Link, useRouterState } from '@tanstack/react-router'
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  Globe,
} from '@phosphor-icons/react'
import CompanyLogo from './CompanyLogo'
import UserAvatar from './UserAvatar'
import { useAuth } from '@/hooks/useAuth'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getEnabledEntities } from '@boon-digital/rocket-admin-config/registry'
import { iconMap } from '@boon-digital/rocket-admin-config/iconMap'
import { appBranding } from '@boon-digital/rocket-admin-config/appConfig'

// Generate grouped menu items from Entity Registry
const allEntities = getEnabledEntities()
const groups: { label: string; items: { title: string; url: string; icon: any }[] }[] = []
for (const entity of allEntities) {
  const groupLabel = entity.sidebarGroup ?? 'Entities'
  let group = groups.find((g) => g.label === groupLabel)
  if (!group) {
    group = { label: groupLabel, items: [] }
    groups.push(group)
  }
  group.items.push({ title: entity.namePlural, url: entity.route, icon: iconMap[entity.icon] ?? Globe })
}

export default function AppSidebar() {
  const { state, setOpen } = useSidebar()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { user } = useAuth()


  const handleToggle = () => {
    if (isCollapsed) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between overflow-hidden">
        {!isCollapsed && <CompanyLogo />}
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggle}
        >
          {isCollapsed ? (
            <CaretDoubleRight className="h-4 w-4" weight="light" />
          ) : (
            <CaretDoubleLeft className="h-4 w-4" weight="light" />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group, groupIdx) => (
          <div key={group.label}>
            {groupIdx > 0 && <Separator className="my-2 opacity-50" />}
            {!isCollapsed && (
              <p className="px-3 py-1 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.url)
              const button = (
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={item.url}>
                    <Icon />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              )
              if (!isCollapsed) {
                return <div key={item.title}>{button}</div>
              }
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>{button}</TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {user && <UserAvatar user={user} isCollapsed={isCollapsed} />}
        <div className="h-8 px-4 py-2 text-xs text-muted-foreground text-nowrap">
          {!isCollapsed && <div className="mt-1">{appBranding.footerText}</div>}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
