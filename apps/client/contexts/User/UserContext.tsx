"use client";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { User } from "project-common";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserContext } from "@/contexts/User/types";
import { userProvider } from "@/providers/api/user";
import UserPrayersProvider from "@/contexts/UserPrayers/UserContext";

export const UserContext = createContext({} as IUserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(true);
  const { isAuthenticated, signOut } = useContext(AuthContext);

  const getCurrentUser = useCallback(async () => {
    setIsFetchingUser(true);

    try {
      const user = await userProvider.getUser();
      setUser(user);
    } catch (error) {
      setUser(null);
      signOut();
      console.error();
    }

    setIsFetchingUser(false);
  }, [signOut]);

  useEffect(() => {
    if (isAuthenticated) getCurrentUser();
    else {
      setUser(null);
      setIsFetchingUser(false);
    }
  }, [getCurrentUser, isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, setUser, isFetchingUser }}>
      <UserPrayersProvider>{children}</UserPrayersProvider>
    </UserContext.Provider>
  );
}
