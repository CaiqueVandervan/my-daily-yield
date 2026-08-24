import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-[#A3A3A3] focus-visible:ring-3 focus-visible:ring-[#A3A3A3]/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        outline:
          "border-[#E8E8E8] p-2 rounded-xl bg-gray-500 hover:bg-[#F5F5F5] hover:text-[#1F1F1F] aria-expanded:bg-[#F5F5F5] aria-expanded:text-[#1F1F1F]",
        ghost:
          "hover:bg-[#F5F5F5] hover:text-[#1F1F1F] aria-expanded:bg-[#F5F5F5] aria-expanded:text-[#1F1F1F] dark:hover:bg-[#F5F5F5]/50",
      },
      size: {
        default:
          " gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      },
    },
  }
)

function Button({
  className,
  variant = "outline",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
