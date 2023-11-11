"use client";
import { AuthContext } from "@contexts/Auth/AuthContext";
import { Prayer, User } from "project-common";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserPrayersContext } from "@contexts/UserPrayers/types";
import { userProvider } from "@providers/api/user";
import { produce } from "immer";
import useSWR from "swr";
import { UserContext } from "@contexts/User/UserContext";

export const UserPrayersContext = createContext({} as IUserPrayersContext);

export default function UserPrayersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useContext(UserContext);

  const { data: prayers, mutate } = useSWR(
    "userPrayers",
    () => {
      console.log("revalidating", { user });
      return user ? userProvider.listUserPrayers() : [];
    },
    { fallbackData: [] }
  );
  const [isFetchingPrayers, setIsFetchingPrayers] = useState<boolean>(true);

  const includePrayer = async (prayer: Prayer) => {
    setIsFetchingPrayers(true);

    try {
      await userProvider.includePrayer({ prayerId: prayer.id });

      mutate([...prayers, prayer], false);
    } catch (error) {
      console.error(error);
    }

    setIsFetchingPrayers(false);
  };

  const removePrayer = async (prayer: Prayer): Promise<Prayer> => {
    await userProvider.removePrayer(prayer.id);

    const removeIndex = prayers.findIndex((it) => it.id === prayer.id);
    if (removeIndex < 0) return prayer;

    const updatedList = prayers.splice(removeIndex, 1);
    mutate(updatedList, false);
    return prayer;
  };

  useEffect(() => {
    if (user) mutate();
  }, [mutate, user]);

  return (
    <UserPrayersContext.Provider
      value={{ prayers, includePrayer, removePrayer, isFetchingPrayers }}
    >
      {children}
    </UserPrayersContext.Provider>
  );
}
