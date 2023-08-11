"use client";

import { SingleSelectProps } from "@components/Selects/SingleSelect/types";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SingleSelect = forwardRef<HTMLSelectElement, SingleSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          "select select-bordered select-primary bg-zinc-200 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

SingleSelect.displayName = "SingleSelect";

export default SingleSelect;
