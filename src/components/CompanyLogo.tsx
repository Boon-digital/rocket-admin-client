import { Image } from '@unpic/react'
import { useSettingsStore } from '@/stores/settingsStore'
import { appBranding } from '@/app.config'

export default function CompanyLogo() {
  const { theme } = useSettingsStore()
  const logoSrc = theme === 'dark' ? appBranding.logoDark : appBranding.logoLight

  return (
    <div className="flex items-center gap-2">
      <Image
        src={logoSrc}
        alt="Company Logo"
        width={40}
        height={40}
        className="h-10 w-10"
      />
      {/* <div className="flex flex-col">
        <span className="text-nowrap text-sm font-semibold leading-none">Buttons & Beans</span>
        <span className="text-xs text-muted-foreground">Template</span>
      </div> */}
    </div>
  )
}
