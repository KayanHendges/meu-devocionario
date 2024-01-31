import { UseFormReturn, Path, FieldPath, FieldValues } from "react-hook-form";

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type NestedKeysSatifiesType<Type extends FieldValues, T> = {
  [K in FieldPath<Type>]: Type[K] extends T ? K : never;
}[Path<Type>];

type FormValueType<T extends FieldValues> = PathValue<
  T,
  NestedKeysSatifiesType<T, string>
>;

interface FormRef<T = Record<string, any>> extends UseFormReturn<T> {
  name: Path<T>;
}
