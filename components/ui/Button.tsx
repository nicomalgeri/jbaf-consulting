import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-600 hover:to-primary-600 focus-visible:ring-primary-500 shadow-premium hover:shadow-lg hover:-translate-y-0.5",
        secondary: "border-2 border-primary-300 text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500",
        accent: "bg-gradient-to-r from-accent-600 to-accent-500 text-white hover:from-accent-600 hover:to-accent-600 focus-visible:ring-accent-500 shadow-premium hover:shadow-lg hover:-translate-y-0.5",
        ghost: "hover:bg-gray-100 text-gray-700",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
        lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      return <span className={classes}>{children}</span>;
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
