"use client";

import PrayersList from "@components/Lists/PrayersList";
import { UserPrayersContext } from "@contexts/UserPrayers/UserContext";
import { useContext } from "react";

export default function UserPrayersList() {
  const { prayers } = useContext(UserPrayersContext);

  return <PrayersList list={prayers} />;
}
