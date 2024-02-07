import { twMerge } from "tailwind-merge";
import ThemeSwitcher from "../ThemeSwitcher";
import useRoutes from "@/routes";
import Button from "../Buttons/Button";
import { Slot } from "@radix-ui/react-slot";
import { Text } from "../Texts/Text";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useContainer } from "class-validator";
import { useContext } from "react";
import { UserContext } from "@/contexts/User/UserContext";
import { fullNameInitials } from "@/utils/formats/string";

interface Props {
  className: string;
}

export default function NavSideBar({ className }: Props) {
  const { routes, selectedItemIndex, handleNavigation } = useRoutes();
  const { user } = useContext(UserContext);

  return (
    <div
      className={twMerge(
        "flex flex-1 flex-col max-w-[400px] h-full gap-4",
        "border bg-white shadow-black border-zinc-300",
        "dark:bg-black dark:shadow-white dark:border-zinc-800",
        "rounded-tr-2xl rounded-br-2xl",
        className
      )}
    >
      {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>
            {fullNameInitials(user?.name || "Convidado")}
          </AvatarFallback>
        </Avatar>
        <Text size="xl">Olá, <strong>{user?.name || "convidado"}</strong>!</Text>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {routes.map((route, index) => {
          const isSelected = selectedItemIndex === index;
          return (
            <Button
              key={route.path}
              className={twMerge(
                "flex flex-row gap-2 justify-start items-center",
                isSelected &&
                  "bg-brand dark:bg-brand text-white dark:text-white",
                isSelected &&
                  "hover:bg-brand hover:text-white dark:hover:bg-brand dark:hover:text-white"
              )}
              onClick={() => handleNavigation(route)}
            >
              <Slot className="w-6 h-6">{route.icon}</Slot>
              <Text className={twMerge(isSelected && "text-white")}>
                {route.label}
              </Text>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
