"use client";
import { usePathname } from "next/navigation";
import { GrHomeRounded, GrSearch } from "react-icons/gr";
import { BiBible } from "react-icons/bi";
import { useMemo } from "react";

export default function useRoutes() {
  const pathname = usePathname();

  const routes = useMemo<RouteItem[]>(
    () => [
      { label: "Início", path: "/", icon: <GrHomeRounded /> },
      { label: "buscar", path: "/search", icon: <GrSearch /> },
      { label: "Orações", path: "/prayers", icon: <BiBible /> },
    ],
    []
  );

  const currentRoute = useMemo(
    () => routes.find((route) => route?.path?.startsWith(pathname)),
    [pathname, routes]
  );

  return { routes, currentRoute };
}
