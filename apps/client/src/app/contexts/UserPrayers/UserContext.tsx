"use client";
import { Prayer } from "project-common";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { IUserPrayersContext } from "@contexts/UserPrayers/types";
import { userProvider } from "@providers/api/user";
import useSWR from "swr";
import { UserContext } from "@contexts/User/UserContext";

export const UserPrayersContext = createContext({} as IUserPrayersContext);

export default function UserPrayersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useContext(UserContext);

  const {
    data: prayers,
    mutate,
    isLoading: isFetchingPrayers,
    error,
    isValidating,
  } = useSWR(
    "userPrayers",
    () => {
      return user ? userProvider.listUserPrayers() : [];
    },
    {
      fallbackData: [],
      revalidateOnFocus: false,
    }
  );

  const includePrayer = async (prayer: Prayer): Promise<Prayer> => {
    const newList: Prayer[] = [
      ...prayers,
      { ...prayer, updatedAt: new Date() },
    ];

    const promise = async () => {
      await userProvider.includePrayer({ prayerId: prayer.id });
      return newList;
    };

    mutate(promise, {
      optimisticData: newList,
      revalidate: false,
    });

    return prayer;
  };

  const removePrayer = async (prayer: Prayer): Promise<Prayer> => {
    const removeIndex = prayers.findIndex((it) => it.id === prayer.id);
    const newList = prayers;

    if (removeIndex >= 0) newList.splice(removeIndex, 1);

    const promise = async () => {
      await userProvider.removePrayer(prayer.id);
      return newList;
    };

    mutate(promise, { optimisticData: newList, revalidate: false });

    return prayer;
  };

  useEffect(() => {
    mutate();
  }, [mutate, user]);

  return (
    <UserPrayersContext.Provider
      value={{ prayers, includePrayer, removePrayer, isFetchingPrayers }}
    >
      {children}
    </UserPrayersContext.Provider>
  );
}
