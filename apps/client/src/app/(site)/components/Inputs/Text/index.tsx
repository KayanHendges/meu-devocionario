import { InputTextProps } from "@components/Inputs/Text/types";
import { FieldValues, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export default function TextInput<T extends FieldValues>({
  className,
  formHook,
  inputName,
  ...props
}: InputTextProps<T>) {
  const internalForm = useForm<T>();
  const { register, formState } = formHook || internalForm;
  const error = formState.errors[inputName];

  return (
    <input
      type="text"
      className={twMerge(
        "input input-bordered input-primary w-full bg-zinc-200 dark:bg-zinc-900",
        className
      )}
      {...register(inputName)}
      {...props}
    />
  );
}
