"use client";
import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "phosphor-react";
import { Button, ButtonProps } from "../ui/button";

interface Props extends ButtonProps {
  className?: string;
}

type Theme = "light" | "dark";

export default function ThemeSwitcher(props: Props) {
  const getPreferenceTheme = (): Theme | null => {
    const preferenceTheme =
      typeof window !== "undefined" && localStorage.getItem("theme");
    if (preferenceTheme === "light") return "light";
    if (preferenceTheme === "dark") return "light";
    return null;
  };

  const [theme, setTheme] = useState<Theme>(
    () => getPreferenceTheme() || "light"
  );

  const handleTheme = useCallback((value: Theme) => {
    setTheme(value);
    if (value === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const handleLocalStorage = (value: Theme) => {
    if (typeof window !== "undefined") localStorage.setItem("theme", value);
    handleTheme(value);
  };

  const watchMatchMedia = useCallback(
    (event: MediaQueryListEvent) => {
      const systemTheme = event.matches ? "dark" : "light";
      handleTheme(systemTheme);
    },
    [handleTheme]
  );

  useEffect(() => {
    const preferenceTheme = getPreferenceTheme();
    if (preferenceTheme) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", watchMatchMedia);
    return () => mq.removeEventListener("change", watchMatchMedia);
  }, [handleTheme, watchMatchMedia]);

  const isDark = theme !== "light";
  const size = 24;

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => handleLocalStorage(theme === "light" ? "dark" : "light")}
      {...props}
    >
      {isDark && <Moon size={size} />}
      {!isDark && <Sun size={size} />}
    </Button>
  );
}
