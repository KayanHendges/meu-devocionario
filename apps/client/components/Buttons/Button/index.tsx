import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: `
  bg-zinc-200 hover:bg-zinc-300 text-zinc-900 hover:text-zinc-950
  dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:hover:text-white
  text-center rounded-lg transition-all`,
  variants: {
    primary: {
      true: `
    bg-brand hover:bg-brand text-zinc-100 hover:text-white
    dark:bg-brand dark:hover:bg-brand`,
    },
    isLoading: {
      true: "",
    },
    size: {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    },
  },
  defaultVariants: {
    primary: false,
    isLoading: false,
    size: "md",
  },
});

export interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    VariantProps<typeof button> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isLoading,
      size,
      children,
      disabled,
      asChild,
      primary,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        data-loading={isLoading || undefined}
        className={button({ primary, isLoading, size, className })}
        {...props}
        disabled={disabled || isLoading}
      >
        {isLoading ? "Carregando" : children }
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
