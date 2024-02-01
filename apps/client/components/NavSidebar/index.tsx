import { twMerge } from "tailwind-merge";
import { Heading } from "../Texts/Heading";
import ThemeSwitcher from "../ThemeSwitcher";

interface Props {
  className: string;
}

export default function NavSideBar({ className }: Props) {
  return (
    <div
      className={twMerge(
        "flex flex-1 flex-col max-w-[400px] h-full",
        "border bg-white shadow-black border-zinc-300",
        "dark:bg-black dark:shadow-white dark:border-zinc-800",
        className
      )}
    >
      {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
    </div>
  );
}
