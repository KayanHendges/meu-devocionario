import { FieldProps } from "@components/types";
import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";

interface InputTextProps<T extends FieldValues>
  extends ComponentProps<"input">,
    FieldProps<T> {}
