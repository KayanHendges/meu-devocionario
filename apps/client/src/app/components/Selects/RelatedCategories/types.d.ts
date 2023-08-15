import { Category } from "project-types";
import { ComponentProps } from "react";

interface RelatedCategoriesSelectProps
  extends ComponentProps<"div">,
    FieldProps {
  onSelect?: (list: Category[]) => void;
  initialIds?: string[];
}
