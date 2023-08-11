import { FieldProps } from "@components/types";
import { Category } from "project-types";
import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";

interface CategorySelectProps extends ComponentProps<"select">, FieldProps {
  onSelect?: (value: Category) => void;
  initialCategoryId?: string;
}
