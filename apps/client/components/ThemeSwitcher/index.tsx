"use client";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { Switch } from "../ui/switch";

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
      <Switch
        className="toggle ml-auto"
        checked={theme === "dark"}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </div>
  );
}
