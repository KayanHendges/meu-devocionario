import { Heading } from "../Texts/Heading";
import { useContext } from "react";
import { AppContext } from "@/contexts/App/AppContext";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { List } from "phosphor-react";

export default function Header() {
  const { header } = useContext(AppContext);

  return (
    <div
      className={twMerge(
        "w-full h-12 flex items-center px-2",
        "bg-white dark:bg-zinc-900 border-b-zinc-500 "
      )}
    >
      {header && <Heading>{header}</Heading>}
      <Button className="ml-auto p-2" variant={"ghost"}>
        <List size={32} />
      </Button>
    </div>
  );
}
