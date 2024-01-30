import * as React from "react";

import { cn } from "@/lib/utils";
import { Input, InputProps } from "./input";

export interface InputPasswordProps extends InputProps {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    return <Input className={cn("", className)} {...props} ref={ref} />;
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
