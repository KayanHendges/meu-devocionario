import { twMerge } from "tailwind-merge";
import ThemeSwitcher from "../ThemeSwitcher";
import useRoutes from "@/routes";
import { Button } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";
import { Text } from "../Texts/Text";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useContext } from "react";
import { UserContext } from "@/contexts/User/UserContext";
import { Gear } from "phosphor-react";
import { Separator } from "../ui/separator";
import SignInDialog from "../Dialogs/SignIn";
import SignOutButton from "../Buttons/SignOut";
import PreferenceDialog from "../Dialogs/Preference";

interface Props {
  className: string;
}

export default function NavSideBar({ className }: Props) {
  const { routes, selectedItemIndex, handleNavigation } = useRoutes();
  const { user } = useContext(UserContext);

  return (
    <div
      className={twMerge(
        "flex flex-1 flex-col max-w-[400px] h-full gap-4 p-4",
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
          <AvatarFallback>{user?.name || "Convidado"}</AvatarFallback>
        </Avatar>
        <Text size="xl">
          Olá, <strong>{user?.name || "convidado"}</strong>!
        </Text>
        {!user?.name && <SignInDialog />}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {routes.map((route, index) => {
          const isSelected = selectedItemIndex === index;
          return (
            <Button
              key={route.path}
              variant={isSelected ? "primary" : "secondary"}
              onClick={() => handleNavigation(route)}
              className="justify-start"
            >
              <Slot className="w-6 h-6 mr-2">{route.icon}</Slot>
              {route.label}
            </Button>
          );
        })}
      </div>
      <div className="flex justify-between mt-auto">
        <PreferenceDialog />
        {user && <SignOutButton />}
      </div>
    </div>
  );
}
