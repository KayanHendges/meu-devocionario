"use client";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import { Text } from "@components/Texts/Text";
import { ComponentProps, useEffect, useMemo, useRef, useState } from "react";
import { set } from "react-hook-form";
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
  const [_, setLoadRefs] = useState<boolean>(false);
  const dividerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  console.log(contentRef, dividerRef);

  const dividerHeight = dividerRef.current
    ? dividerRef.current.offsetHeight
    : 0;

  const contentHeight = contentRef.current
    ? contentRef.current.offsetHeight
    : 0;

  const containerHeight = hidden
    ? dividerHeight * 2
    : contentHeight + dividerHeight;

  const label = useMemo(
    () => (hidden ? "Mostrar Descrição" : "Ocultar Descrição"),
    [hidden]
  );

  useEffect(() => {
    setLoadRefs(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      data-hidden={hidden || undefined}
      data-loading={!containerHeight || undefined}
      style={{ height: containerHeight }}
      className={twMerge(
        `w-full data-[loading]:opacity-0 flex flex-col items-center relative`,
        "data-[hidden]:overflow-hidden data-[hidden]:pb-0 transition-all",
        className
      )}
      {...props}
    >
      <HtmlDisplay ref={contentRef}>{children}</HtmlDisplay>
      <div
        data-hidden={hidden || undefined}
        style={{ height: containerHeight - dividerHeight }}
        className={twMerge(
          "w-full z-10 opacity-0 data-[hidden]:opacity-100 absolute top-0 transition-all",
          "bg-gradient-to-t from-gray-100 to-transparent dark:from-zinc-950"
        )}
      />
      <div
        className={twMerge(
          "w-full z-10 flex bg-zinc-100 dark:bg-zinc-950 justify-center absolute -bottom-0 cursor-pointer",
          "before:w-full before:h-[1px] before:bg-gray-600 before:absolute before:top-1/2 before:bottom-1/2"
        )}
      >
        <Text
          ref={dividerRef}
          className="z-20 bg-zinc-100 dark:bg-zinc-950 rounded-lg p-2"
          onClick={() => setHidden(!hidden)}
        >
          {label}
        </Text>
      </div>
    </div>
  );
}
