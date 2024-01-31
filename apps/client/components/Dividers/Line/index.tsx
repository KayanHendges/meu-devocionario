import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {}

export default function LineDivider({ className, ...props }: Props) {
  return (
    <div
      className={twMerge("w-full h-[1px] bg-zinc-500", className)}
      {...props}
    />
  );
}
