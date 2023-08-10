import { FieldProps } from "@components/types";
import { Category } from "project-types";
import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";

interface CategorySelectProps<T extends FieldValues>
  extends ComponentProps<"select">,
    FieldProps<T> {
  onSelect?: (value: Category) => void;
  initialCategoryId?: string
}
