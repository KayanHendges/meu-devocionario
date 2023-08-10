"use client";

import { SingleSelectProps } from "@components/Selects/SingleSelect/types";
import { FieldValues, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export default function SingleSelect<T extends FieldValues>({
  className,
  children,
  formHook,
  inputName,
  ...props
}: SingleSelectProps<T>) {
  const internalForm = useForm<T>();
  const { register, formState } = formHook || internalForm;
  const error = formState.errors[inputName];

  return (
    <select
      className={twMerge(
        "select select-bordered select-primary bg-zinc-200 dark:bg-zinc-900",
        className
      )}
      {...register(inputName)}
      {...props}
      name={props?.name || inputName}
    >
      {children}
    </select>
  );
}
