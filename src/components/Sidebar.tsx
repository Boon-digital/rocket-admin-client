import { Link, useRouterState } from '@tanstack/react-router'
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  Globe,
} from '@phosphor-icons/react'
import SettingsPopover from './SettingsPopover'
import CompanyLogo from './CompanyLogo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getEnabledEntities } from '@boon-digital/rocket-admin-config/registry'
import { iconMap } from '@boon-digital/rocket-admin-config/iconMap'
import { appBranding } from '@/app.config'

// Generate menu items from Entity Registry
const menuItems = getEnabledEntities().map((entity) => ({
  title: entity.namePlural,
  url: entity.route,
  icon: iconMap[entity.icon] ?? Globe,
}))

export default function AppSidebar() {
  const { state, setOpen } = useSidebar()
  const pathname = useRouterState({ select: (s) => s.location.pathname })


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
        {menuItems.map((item, index) => {
          if ('type' in item && item.type === 'separator') {
            return <div key={`separator-${index}`} className="h-4" />
          }
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
      </SidebarContent>
      <SidebarFooter>
        <SettingsPopover isCollapsed={isCollapsed} />
        <div className="h-8 px-4 py-2 text-xs text-muted-foreground text-nowrap">
          {!isCollapsed && <div className="mt-1">{appBranding.footerText}</div>}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
