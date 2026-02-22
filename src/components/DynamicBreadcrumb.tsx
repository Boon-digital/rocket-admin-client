import * as React from 'react'
import { useMatches, Link } from '@tanstack/react-router'
import { House } from '@phosphor-icons/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function DynamicBreadcrumb() {
  const matches = useMatches()

  // Get all matched routes, excluding the root route
  // Build breadcrumbs from the pathname segments
  const currentMatch = matches[matches.length - 1]
  const pathname = currentMatch?.pathname || '/'

  // Split pathname into segments and build breadcrumb trail
  const pathSegments = pathname.split('/').filter(Boolean)

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/')

    // Format the label: capitalize and replace hyphens with spaces
    const formattedLabel = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return {
      path,
      label: formattedLabel,
    }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home link is always shown */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <House className="h-4 w-4" weight="light" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Show additional breadcrumbs only if we're not on the home page */}
        {breadcrumbs.length > 0 && (
          <>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    // Last item is the current page (not clickable)
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    // Other items are clickable links
                    <BreadcrumbLink asChild>
                      <Link to={crumb.path}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
