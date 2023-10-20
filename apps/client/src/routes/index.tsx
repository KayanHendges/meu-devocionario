"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BookBookmark, House, MagnifyingGlass } from "phosphor-react";

export default function useRoutes() {
  const pathname = usePathname();

  const routes = useMemo<RouteItem[]>(
    () => [
      { label: "Início", icon: <House />, path: "/" },
      // { label: "buscar", path: "/buscar", icon: <MagnifyingGlass /> },
      {
        label: "Meu devocionário",
        path: "/meu-devocionario",
        icon: <BookBookmark />,
      },
    ],
    []
  );

  const currentRoute = useMemo(
    () => routes.find((route) => route?.path?.startsWith(pathname)),
    [pathname, routes]
  );

  return { routes, currentRoute };
}
