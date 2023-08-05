import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";

export interface TextProps extends ComponentProps<"span"> {
  size?: "sm" | "md" | "lg" | "xl";
  asChild?: boolean;
  truncate?: boolean;
}

export function Text({
  size = "md",
  children,
  asChild,
  className,
  truncate = true,
  title,
  ...props
}: TextProps) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      className={clsx(
        "font-sans text-zinc-900 dark:text-zinc-200",
        {
          truncate,
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-md": size === "lg",
          "text-lg": size === "xl",
        },
        className
      )}
      title={title}
      {...props}
      ref={undefined}
    >
      {children}
    </Component>
  );
}
