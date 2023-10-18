import { Category } from "project-common";
import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";

interface CategorySelectProps extends ComponentProps<"select">, FieldProps {
  onSelect?: (value: Category) => void;
  initialCategoryId?: string;
}
