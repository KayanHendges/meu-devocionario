import { InputTextProps } from "@components/Inputs/Text/types";
import { Ref, forwardRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const TextInput = forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={twMerge(
          "input input-bordered input-primary w-full bg-zinc-200 dark:bg-zinc-900",
          className
        )}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
