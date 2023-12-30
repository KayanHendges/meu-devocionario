import { Fragment, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";
import LabelInput from "@components/Inputs/Label";

interface InputTextProps extends ComponentProps<"input">, FieldProps {
  label?: string;
}

const TextInput = forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, label, ...props }, ref) => {
    const Container = label ? "div" : Fragment;

    return (
      <Container>
        {label && <LabelInput>{label}</LabelInput>}
        <input
          ref={ref}
          type="text"
          className={twMerge(
            "input input-bordered input-primary w-full bg-zinc-200 dark:bg-zinc-900",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            className
          )}
          {...props}
        />
      </Container>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
