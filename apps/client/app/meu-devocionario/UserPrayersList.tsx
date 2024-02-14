"use client";

import SignInDialog from "@/components/Dialogs/SignIn";
import PrayersList from "@/components/Lists/PrayersList";
import { Heading } from "@/components/Texts/Heading";
import { Text } from "@/components/Texts/Text";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { UserContext } from "@/contexts/User/UserContext";
import { UserPrayersContext } from "@/contexts/UserPrayers/UserContext";
import { useContext } from "react";

export default function UserPrayersList() {
  const { user, isFetchingUser } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { prayers } = useContext(UserPrayersContext);

  return (
    <div className="flex flex-col gap-2">
      <Heading>Minhas Orações</Heading>
      <Separator />
      {!user && !isFetchingUser && (
        <div className="flex flex-col max-w-[720px]">
          <Text>Faça login para ver a suas orações</Text>
          <SignInDialog />
        </div>
      )}
      <PrayersList list={prayers} />
    </div>
  );
}
