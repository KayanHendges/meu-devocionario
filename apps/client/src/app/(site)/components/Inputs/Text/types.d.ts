import { FieldProps } from "@components/types";
import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";

interface InputTextProps extends ComponentProps<"input">, FieldProps {}
