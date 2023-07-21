import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const watchMatchMedia = (event: MediaQueryListEvent) =>
    setTheme(event.matches ? "dark" : "light");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", watchMatchMedia);
    return () => mq.removeEventListener("change", watchMatchMedia);
  }, []);

  return (
    <div
      className={clsx(
        "w-full h-12 flex items-center px-2",
        "bg-white dark:bg-zinc-900",
        "shadow-x"
      )}
    >
      <input
        type="checkbox"
        className="toggle ml-auto"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </div>
  );
}
