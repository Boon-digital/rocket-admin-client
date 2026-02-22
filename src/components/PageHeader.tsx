import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'

interface PageHeaderProps {
  children?: React.ReactNode
}

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 px-6 justify-between">
      <DynamicBreadcrumb />
      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  )
}
