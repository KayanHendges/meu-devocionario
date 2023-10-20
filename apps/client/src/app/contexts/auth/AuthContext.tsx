import { authProvider } from "@providers/api/auth";
import { cookies } from "next/headers";
import { LoginUserDTO } from "project-common";
import { ReactNode, createContext, useState } from "react";
import { IAuthContext } from "src/app/contexts/auth/types";

export const AuthContext = createContext({} as IAuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const cookieStore = cookies();

  const signIn = async (payload: LoginUserDTO) => {
    try {
      const { accessToken } = await authProvider.login(payload);

      cookieStore.set("auth.token", accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error(error);
    }
  };

  const signOut = async () => {};

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
