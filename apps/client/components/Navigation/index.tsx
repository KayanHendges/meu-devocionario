"use client";
import { Slot } from "@radix-ui/react-slot";
import useRoutes from "@/routes/index";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Navigation() {
  const { routes, currentRoute } = useRoutes();
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  const selectedItemIndex = routes.findIndex(
    (route) => currentRoute?.path === route?.path
  );

  const handleNavigation = ({ path, action }: RouteItem) => {
    if (pathname === path) return;

    if (action) return action();
    if (path) router.push(path);
  };

  const calcWidth = () => {
    const fallback = { width: 0, left: 0 };

    if (!navRef.current) return fallback;

    const selected = navRef.current.children.item(selectedItemIndex);

    if (!selected) return fallback;

    const width = selected?.clientWidth || 0;
    const left = selected?.getBoundingClientRect().left || 0;

    return { width: `${width}px`, left: `${left}px` };
  };

  const indicatorStyle = calcWidth();

  return (
    <div
      ref={navRef}
      className={twMerge(
        "flex items-center justify-around w-full h-16",
        "rounded-t-xl border border-b-0 border-zinc-300 dark:border-zinc-800",
        "fixed left-0 bottom-0 px-2",
        "drop-shadow-2xl bg-white shadow-black dark:bg-black dark:shadow-white"
      )}
    >
      {routes.map((route) => {
        const selected = currentRoute?.path === route?.path;
        return (
          <button
            key={route.label}
            className={twMerge(
              "flex-1 h-full flex justify-center items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition",
              selected ? "text-brand" : ""
            )}
            onClick={() => handleNavigation(route)}
          >
            <Slot
              className={twMerge(
                "w-6 h-6",
                selected
                  ? "text-brand"
                  : "text-black dark:text-white transition-colors"
              )}
            >
              {route.icon}
            </Slot>
          </button>
        );
      })}
      <span
        className={twMerge(
          `absolute h-1 bg-brand top-0 left-0 rounded transition-all ease-in-out`
        )}
        style={indicatorStyle}
      />
    </div>
  );
}
