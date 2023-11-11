import { UserPrayersContext } from "@contexts/UserPrayers/UserContext";
import { useContext } from "react";

export default function HandleUserPrayerButton() {
  const { includePrayer, removePrayer } = useContext(UserPrayersContext);

  return <div></div>;
}
