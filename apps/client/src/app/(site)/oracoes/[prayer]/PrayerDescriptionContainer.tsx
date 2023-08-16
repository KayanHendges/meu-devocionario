"use client";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import { Text } from "@components/Texts/Text";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  children: string;
}

export default function PrayerDescriptionContainer({
  className,
  children,
  ...props
}: Props) {
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <div
      data-hidden={hidden || undefined}
      className={twMerge(
        "w-full flex flex-col items-center relative border-b-2 border-zinc-300 pb-4",
        "data-[hidden]:overflow-hidden data-[hidden]:h-12 data-[hidden]:pb-0",
        className
      )}
      {...props}
    >
      <HtmlDisplay>{children}</HtmlDisplay>
      <Text className="absolute bottom-0" onClick={() => setHidden(!hidden)}>
        Ocultar
      </Text>
    </div>
  );
}
