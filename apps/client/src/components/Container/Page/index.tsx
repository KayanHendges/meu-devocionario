import clsx from "clsx";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {}

export default function PageContainer({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col items-center p-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
