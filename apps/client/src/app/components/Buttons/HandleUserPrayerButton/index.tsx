"use client";
import Button, { ButtonProps } from "@components/Buttons/Button";
import { UserPrayersContext } from "@contexts/UserPrayers/UserContext";
import { Prayer } from "project-common";
import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Props extends Omit<ButtonProps, "children"> {
  prayer: Prayer;
}

export default function HandleUserPrayerButton({
  prayer,
  className,
  ...props
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { includePrayer, removePrayer, prayers } =
    useContext(UserPrayersContext);

  const isIncluded = prayers.some(({ id }) => id === prayer.id);
  const label = isIncluded ? "remover" : "adicionar";

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isIncluded) await removePrayer(prayer);
      else await includePrayer(prayer);
    } catch (error) {}

    setIsLoading(false);
  };

  return (
    <Button onClick={handleClick} isLoading={isLoading} {...props}>
      {label}
    </Button>
  );
}
