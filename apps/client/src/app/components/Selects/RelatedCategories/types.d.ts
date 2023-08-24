import { Category } from "project-common";
import { ComponentProps } from "react";

interface RelatedCategoriesSelectProps
  extends ComponentProps<"div">,
    FieldProps {
  onSelect?: (list: Category[]) => void;
  initialIds?: string[];
}
