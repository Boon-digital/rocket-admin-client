import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-slate-50 text-slate-700 border-slate-200 [a&]:hover:bg-slate-100 dark:bg-slate-950/50 dark:text-slate-400 dark:border-slate-800",
        secondary:
          "bg-gray-50 text-gray-700 border-gray-200 [a&]:hover:bg-gray-100 dark:bg-gray-950/50 dark:text-gray-400 dark:border-gray-800",
        destructive:
          "bg-red-50 text-red-700 border-red-200 [a&]:hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800",
        outline:
          "bg-transparent text-foreground border-border [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "border-transparent [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "border-transparent text-primary underline-offset-4 [a&]:hover:underline",

        // Subtle/soft variants with faint backgrounds and darker borders
        success:
          "bg-green-50 text-green-700 border-green-200 [a&]:hover:bg-green-100 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
        warning:
          "bg-yellow-50 text-yellow-700 border-yellow-200 [a&]:hover:bg-yellow-100 dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-800",
        info:
          "bg-blue-50 text-blue-700 border-blue-200 [a&]:hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
        purple:
          "bg-purple-50 text-purple-700 border-purple-200 [a&]:hover:bg-purple-100 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800",
        pink:
          "bg-pink-50 text-pink-700 border-pink-200 [a&]:hover:bg-pink-100 dark:bg-pink-950/50 dark:text-pink-400 dark:border-pink-800",
        orange:
          "bg-orange-50 text-orange-700 border-orange-200 [a&]:hover:bg-orange-100 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
