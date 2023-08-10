import { NestedKeysSatifiesType } from "@utils/types";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface FieldProps<T extends FieldValues, FieldValueType = string> {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  formHook?: UseFormReturn<T>;
  inputName: NestedKeysSatifiesType<T, FieldValueType>;
}
