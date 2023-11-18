"use client";

import { Slot } from "@radix-ui/react-slot";
import useRoutes from "@routes/index";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const { routes, currentRoute } = useRoutes();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = ({ path, action }: RouteItem) => {
    if (pathname === path) return;

    if (action) return action();
    if (path) router.push(path);
  };

  return (
    <div
      className={clsx(
        "btm-nav h-16 transition-all",
        "drop-shadow-xl bg-white shadow-black dark:bg-black dark:shadow-white"
      )}
    >
      {routes.map((route) => {
        const selected = currentRoute?.path === route?.path;
        return (
          <button
            key={route.label}
            className={clsx(
              selected ? "active text-primary" : "",
              "bg-transparent"
            )}
            onClick={() => handleNavigation(route)}
          >
            <Slot
              className={clsx(
                "w-6 h-6",
                selected
                  ? "text-primary"
                  : "text-black dark:text-white transition-colors"
              )}
            >
              {route.icon}
            </Slot>
          </button>
        );
      })}
    </div>
  );
}
