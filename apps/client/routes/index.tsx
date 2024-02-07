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

  const handleNavigation = ({ path, action }: RouteItem) => {
    if (pathname === path) return;

    if (action) return action();
    if (path) router.push(path);
  };

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

  const selectedItemIndex = routes.findIndex(
    (route) => currentRoute?.path === route?.path
  );

  return { routes, currentRoute, selectedItemIndex, handleNavigation };
}
