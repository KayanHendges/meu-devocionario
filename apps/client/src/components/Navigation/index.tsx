"use client";

import { Slot } from "@radix-ui/react-slot";
import useRoutes from "@routes/index";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const { routes, currentRoute } = useRoutes();
  const router = useRouter();

  const handleNavigation = ({ path, action }: RouteItem) => {
    if (path) router.push(path);
    if (action) action();
  };

  return (
    <div
      className={clsx(
        "btm-nav static drop-shadow-xl bg-white shadow-black dark:bg-black dark:shadow-white transition-all"
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
            onClick={() => !selected && handleNavigation(route)}
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
