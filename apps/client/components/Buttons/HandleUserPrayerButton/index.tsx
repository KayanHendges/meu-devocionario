"use client";
import { SignInDialogContext } from "@/components/Dialogs/SignIn";
import { Button, ButtonProps } from "@/components/ui/button";
import { UserContext } from "@/contexts/User/UserContext";
import { UserPrayersContext } from "@/contexts/UserPrayers/UserContext";
import { Prayer } from "project-common";
import { MouseEvent, useContext, useState } from "react";

interface Props extends Omit<ButtonProps, "children"> {
  prayer: Prayer;
}

export default function HandleUserPrayerButton({
  prayer,
  className,
  ...props
}: Props) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { includePrayer, removePrayer, prayers } =
    useContext(UserPrayersContext);

  const { handleOpen } = useContext(SignInDialogContext);

  const isIncluded = prayers.some(({ id }) => id === prayer.id);
  const label = isIncluded ? "remover" : "adicionar";

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!user) return handleOpen(true);

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isIncluded) await removePrayer(prayer);
      else await includePrayer(prayer);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button onClick={handleClick} isLoading={isLoading} {...props}>
        {label}
      </Button>
    </>
  );
}
