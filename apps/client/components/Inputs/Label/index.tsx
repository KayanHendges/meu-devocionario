import { Text } from "@/components/Texts/Text";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";

interface LabelInputProps extends Omit<ComponentProps<"label">, "ref"> {
  asChild?: boolean;
}

export default function LabelInput({
  className,
  children,
  asChild,
  ...props
}: LabelInputProps) {
  const Component = asChild ? Slot : "label";

  return (
    <Component className="label" {...props}>
      <Text asChild={asChild} className="label-text">
        {children}
      </Text>
    </Component>
  );
}
