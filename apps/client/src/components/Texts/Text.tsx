import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { HTMLAttributes, ReactNode } from "react";

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
  title?: string;
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
    >
      {children}
    </Component>
  );
}
