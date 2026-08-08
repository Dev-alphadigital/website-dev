import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Adapted from the shadcn/ui Button: the variant classes below use this
// project's literal brand colors (navy/signal/gold/cream) instead of
// shadcn's CSS-variable tokens (bg-primary, text-muted-foreground, etc.),
// which this project's Tailwind config never defines -- those classes
// would resolve to nothing. Shape follows the same convention every other
// button on this site already uses (rounded-full pill, bold weight)
// rather than shadcn's default rounded-md/font-medium, so this slots in
// next to hand-written CTAs without looking like a different component
// system.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold ring-offset-cream transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-signal text-white shadow-lg shadow-signal/30 hover:brightness-110",
        destructive: "bg-red-600 text-white hover:brightness-110",
        outline: "border-2 border-navy text-navy hover:border-signal hover:text-signal",
        secondary: "bg-navy text-white hover:bg-signal",
        ghost: "text-navy hover:text-signal",
        link: "text-signal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3 text-btn",
        sm: "h-9 px-4 text-btn-sm",
        lg: "h-14 px-8 text-btn",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
