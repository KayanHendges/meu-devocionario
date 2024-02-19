'use client'
import { Heading } from "../Texts/Heading";
import { useContext } from "react";
import { AppContext } from "@/contexts/App/AppContext";
import { twMerge } from "tailwind-merge";
import MobileSidebar from "../MobileSidebar";
import { titles } from "./headerTitles";

export default function Header() {
  const { header } = useContext(AppContext);

  const headerTitle = header || titles[0].value;

  return (
    <div
      className={twMerge(
        "w-full h-12 flex items-center px-2",
        "bg-white dark:bg-zinc-900 border-b-zinc-500 "
      )}
    >
      {headerTitle && <Heading>{headerTitle}</Heading>}
      <div className="hidden mobile:flex ml-auto">
        <MobileSidebar />
      </div>
    </div>
  );
}
