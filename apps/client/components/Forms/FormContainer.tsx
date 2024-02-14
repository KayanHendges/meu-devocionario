import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"form"> {}

export default function FormContainer({ className, ...props }: Props) {
  return (
    <form
      className={twMerge("flex flex-col gap-4 w-full", className)}
      {...props}
    />
  );
}
