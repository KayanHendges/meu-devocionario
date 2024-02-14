"use client";
import { SignInDialogTriggerButton } from "@/components/Dialogs/SignIn";
import { PrayersList, Loading } from "@/components/Lists/PrayersList";
import { Heading } from "@/components/Texts/Heading";
import { Text } from "@/components/Texts/Text";
import { Separator } from "@/components/ui/separator";
import { UserContext } from "@/contexts/User/UserContext";
import { UserPrayersContext } from "@/contexts/UserPrayers/UserContext";
import { useContext } from "react";

export default function UserPrayersList() {
  const { user, isFetchingUser } = useContext(UserContext);
  const { prayers, isFetchingPrayers } = useContext(UserPrayersContext);

  return (
    <div className="flex flex-col gap-2">
      <Heading>Minhas Orações</Heading>
      <Separator />
      {!user && !isFetchingUser && (
        <div className="flex flex-col max-w-[720px]">
          <Text>Faça login para ver a suas orações</Text>
          <SignInDialogTriggerButton />
        </div>
      )}
      {user && !prayers.length && !isFetchingPrayers && (
        <Text>Você ainda não possuí orações.</Text>
      )}
      {isFetchingPrayers && <Loading />}
      <PrayersList list={prayers} />
    </div>
  );
}
