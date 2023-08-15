"use client";

import { SingleSelectProps } from "@components/Selects/SingleSelect/types";
import { Text } from "@components/Texts/Text";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SingleSelect = forwardRef<HTMLSelectElement, SingleSelectProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="label">
            <Text className="label-text">Título da Oração</Text>
          </label>
        )}
        <select
          ref={ref}
          className={twMerge(
            "select select-bordered w-full select-primary bg-zinc-200 dark:bg-zinc-900",
            className
          )}
          {...props}
        >
          <option value="" hidden>
            Selectionar
          </option>
          {children}
        </select>
      </div>
    );
  }
);

SingleSelect.displayName = "SingleSelect";

export default SingleSelect;
