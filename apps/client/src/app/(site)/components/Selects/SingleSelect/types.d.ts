import { FieldProps } from "@components/types";
import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";

interface SingleSelectProps<T extends FieldValues>
  extends ComponentProps<"select">,
    FieldProps<T> {}
