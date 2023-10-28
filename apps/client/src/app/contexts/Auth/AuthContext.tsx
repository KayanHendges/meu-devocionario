"use client";
import { authProvider } from "@providers/api/auth";
import { LoginUserDTO } from "project-common";
import { ReactNode, createContext, useEffect, useState } from "react";
import { IAuthContext } from "src/app/contexts/Auth/types";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { config } from "@config/variables";

export const AuthContext = createContext({} as IAuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  const signIn = async (payload: LoginUserDTO) => {
    try {
      const { accessToken } = await authProvider.login(payload);

      const { exp } = jwtDecode(accessToken);
      const expires = typeof exp === "number" ? new Date(exp * 1000) : exp;

      setCookie(config.accessToken, accessToken, { expires });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error(error);
    }
  };

  const signOut = async () => {
    deleteCookie(config.accessToken);
    setIsAuthenticated(false);
  };

  const validateToken = () => {
    const token = getCookie(config.accessToken);
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
