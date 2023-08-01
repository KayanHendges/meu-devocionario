"use client";

import useRoutes from "@routes/index";
import clsx from "clsx";

export default function Navigation() {
  const { routes, currentRoute } = useRoutes();

  return (
    <div className={clsx("btm-nav bg-white dark:bg-black")}>
      {routes.map(({ icon, path }) => {
        const selected = currentRoute?.path === path;
        return (
          <button
            className={clsx(
              selected ? "active text-black dark:text-white" : "",
              "bg-transparent"
            )}
            key={path}
          >
            <div className="text-red">{icon}</div>
          </button>
        );
      })}
    </div>
  );
}
