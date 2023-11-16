"use client";
import Button, { ButtonProps } from "@components/Buttons/Button";
import { UserContext } from "@contexts/User/UserContext";
import { UserPrayersContext } from "@contexts/UserPrayers/UserContext";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const isIncluded = prayers.some(({ id }) => id === prayer.id);
  const label = isIncluded ? "remover" : "adicionar";

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!user) return router.push("/login");

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
    <Button onClick={handleClick} isLoading={isLoading} {...props}>
      {label}
    </Button>
  );
}
