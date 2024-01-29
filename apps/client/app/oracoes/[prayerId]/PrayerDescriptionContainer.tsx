"use client";
import HtmlDisplay from "@/components/Html/HtmlDisplay";
import { Text } from "@/components/Texts/Text";
import { ComponentProps, useEffect, useMemo, useRef, useState } from "react";
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

  const canHide = contentHeight > 100;

  useEffect(() => {
    setLoadRefs(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      data-hidden={(canHide && hidden) || undefined}
      data-loading={!containerHeight || undefined}
      style={{ height: containerHeight }}
      className={twMerge(
        `w-full data-[loading]:opacity-0 flex flex-col items-center relative`,
        "overflow-hidden transition-all",
        className
      )}
      {...props}
    >
      <HtmlDisplay className={twMerge(canHide ? "pb-4" : "0")} ref={contentRef}>
        {children}
      </HtmlDisplay>
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
          "w-full z-10 flex bg-zinc-100 dark:bg-zinc-950 justify-center absolute -bottom-0 pb-1",
          "before:w-full before:h-[1px] before:bg-gray-600 before:absolute before:top-1/2 before:bottom-1/2",
          canHide ? "cursor-pointer" : "cursor-default"
        )}
      >
        <Text
          ref={dividerRef}
          className={twMerge(
            "z-20 bg-white rounded-xl py-1 px-4 hover:bg-primary shadow hover:text-white transition-all",
            "dark:bg-zinc-900 dark:hover:bg-primary dark:shadow-black",
            canHide ? "opacity-100" : "opacity-0"
          )}
          onClick={() => canHide && setHidden(!hidden)}
        >
          {label}
        </Text>
      </div>
    </div>
  );
}
