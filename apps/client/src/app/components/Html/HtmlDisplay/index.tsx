import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  children: string;
}

const HtmlDisplay = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={twMerge("prose-zinc dark:prose-invert", className)}
        dangerouslySetInnerHTML={{ __html: children }}
        {...props}
        ref={ref}
      />
    );
  }
);

HtmlDisplay.displayName = "HtmlDisplay";

export default HtmlDisplay;
