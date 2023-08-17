import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, forwardRef } from "react";

export interface TextProps extends ComponentProps<"span"> {
  size?: "sm" | "md" | "lg" | "xl";
  asChild?: boolean;
  truncate?: boolean;
}

const Text = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      size = "md",
      children,
      asChild,
      className,
      truncate = true,
      title,
      ...props
    },
    ref
  ) => {
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
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export { Text };
