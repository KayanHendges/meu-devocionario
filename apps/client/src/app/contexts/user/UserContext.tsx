import { AuthContext } from "@contexts/auth/AuthContext";
import { User } from "project-common";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserContext } from "@contexts/user/types";
import { authProvider } from "@providers/api/auth";

export const UserContext = createContext({} as IUserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { isAuthenticated, signOut } = useContext(AuthContext);

  const getCurrentUser = async () => {
    try {
      const user = await authProvider.getUser();
      setUser(user);
    } catch (error) {
      setUser(null);
      signOut();
      console.error();
    }
  };

  useEffect(() => {
    if (isAuthenticated) getCurrentUser();
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
