import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends Omit<ComponentProps<"button">, "ref"> {
  isLoading?: boolean;
  primary?: boolean;
  asChild?: boolean;
}

export default function Button({
  className,
  isLoading,
  children,
  disabled,
  asChild,
  primary,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-primary={primary}
      data-loading={isLoading || undefined}
      className={twMerge(
        "btn border-1 border-neutral-800 text-zinc-800 hover:text-white bg-neutral-50 hover:bg-neutral-800",
        "before:loading before:absolute before:opacity-0 data-[loading]:before:opacity-100",
        primary
          ? "data-[primary]:btn-primary"
          : "dark:bg-zinc-950 dark:hover:bg-white dark:border-white dark:text-zinc-50 dark:hover:text-black",
        className
      )}
      {...props}
      disabled={disabled || isLoading}
    >
      <div
        className={isLoading ? "opacity-0" : "opacity-100 transition-opacity"}
      >
        {children}
      </div>
    </Component>
  );
}
