import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  children: string;
}

export default function HtmlDisplay({ children, className, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "prose",
        className
      )}
      dangerouslySetInnerHTML={{ __html: children }}
      {...props}
    />
  );
}