import BackButton from "@components/Buttons/BackButton";
import { Heading } from "@components/Texts/Heading";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  header?: string;
  backButton?: boolean;
}

export default function PageContainer({
  children,
  className,
  header,
  backButton = true,
  ...props
}: Props) {
  return (
    <div
      className={twMerge("w-full h-full flex flex-col items-center p-3", className)}
      {...props}
    >
      <div className="w-full max-w-[720px] flex flex-col gap-4">
        {(header || backButton) && (
          <div className="flex items-center gap-4">
            <BackButton />
            <Heading size="lg">{header}</Heading>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
