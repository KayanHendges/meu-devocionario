"use client";

import LabelInput from "@/components/Inputs/Label";
import { SingleSelectProps } from "@/components/Selects/SingleSelect/types";
import { Text } from "@/components/Texts/Text";
import { Fragment, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SingleSelect = forwardRef<HTMLSelectElement, SingleSelectProps>(
  ({ className, children, label, ...props }, ref) => {
    const Container = label ? "div" : Fragment;

    return (
      <Container>
        {label && <LabelInput>{label}</LabelInput>}
        <select
          ref={ref}
          className={twMerge(
            "select select-bordered w-full select-brand bg-zinc-200 dark:bg-zinc-900",
            className
          )}
          {...props}
        >
          <option hidden>
            Selecionar
          </option>
          {children}
        </select>
      </Container>
    );
  }
);

SingleSelect.displayName = "SingleSelect";

export default SingleSelect;
