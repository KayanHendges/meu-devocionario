"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BookBookmark, House, MagnifyingGlass } from "phosphor-react";
import { getCookie } from "cookies-next";
import { config } from "@/config/variables";

export default function useRoutes() {
  const pathname = usePathname();
  const router = useRouter();

  const handleAuthenticatedPath = useCallback(
    (path: string) => {
      const token = getCookie(config.accessToken);
      const isAuthenticated = !!token;
      const routerPath = isAuthenticated ? path : "/login";
      router.push(routerPath);
    },
    [router]
  );

  const routes = useMemo<RouteItem[]>(
    () => [
      {
        label: "Início",
        icon: <House />,
        path: "/",
        childrenRoutesPattern: /^\/(categorias|oracoes)+.*/g,
      },
      // { label: "buscar", path: "/buscar", icon: <MagnifyingGlass /> },
      {
        label: "Meu devocionário",
        path: "/meu-devocionario",
        action: () => handleAuthenticatedPath("/meu-devocionario"),
        icon: <BookBookmark />,
        childrenRoutesPattern: /^\/(meu-devocionario|login|registrar)+.*/g,
      },
    ],
    [handleAuthenticatedPath]
  );

  const currentRoute = useMemo(
    () =>
      routes.find(
        (route) =>
          route?.path?.startsWith(pathname) ||
          (route.childrenRoutesPattern &&
            pathname.match(route.childrenRoutesPattern))
      ),
    [pathname, routes]
  );

  return { routes, currentRoute };
}
