"use client";

import Button from "@components/Buttons/Button";
import { prayersProviders } from "@providers/api/prayers";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  prayerId: string;
}

export default function DeletePrayerButton({ prayerId, ...props }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const deletePrayer = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await prayersProviders.deletePrayer(prayerId);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);

    router.back();
  };

  return (
    <Button onClick={deletePrayer} isLoading={isLoading} {...props} />
  );
}
