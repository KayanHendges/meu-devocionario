"use client";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const watchMatchMedia = useCallback(
    (event: MediaQueryListEvent) => setTheme(event.matches ? "dark" : "light"),
    [setTheme]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", watchMatchMedia);
    return () => mq.removeEventListener("change", watchMatchMedia);
  }, [watchMatchMedia]);

  return (
    <div>
      <input
        type="checkbox"
        className="toggle ml-auto"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </div>
  );
}
