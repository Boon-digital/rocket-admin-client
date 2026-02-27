import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { appBranding } from '@boon-digital/rocket-admin-config/appConfig'
import { useSettingsStore } from '@/stores/settingsStore'

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export function LoginPanel() {
  const theme = useSettingsStore((s) => s.theme)
  const logo = theme === 'dark' ? appBranding.logoDark : appBranding.logoDark

  return (
    <>
      {/* Logo — fixed top-left */}
      <div className="fixed top-8 left-8 z-10">
        <img src={logo} alt={appBranding.appName} className="h-8 w-auto" />
      </div>

      {/* Left panel — image */}
      <div className="hidden lg:block w-1/2 h-full relative overflow-hidden">
        <img src="/newyorkithink.webp" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 h-full flex items-center justify-center px-8">
        <div className="w-full max-w-xs flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-center">Sign in to Miceflow</h1>
            <p className="text-sm text-muted-foreground text-center">
              Use your organisation account to continue
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full gap-2" asChild>
              <a href="/auth/microsoft">
                <MicrosoftIcon />
                Continue with Microsoft
              </a>
            </Button>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-muted-foreground text-xs">or</span>
              <Separator className="flex-1" />
            </div>

            <Button variant="outline" className="w-full gap-2" asChild>
              <a href="/auth/google">
                <GoogleIcon />
                Continue with Google
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
