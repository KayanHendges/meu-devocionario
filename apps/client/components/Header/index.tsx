import clsx from "clsx";

export default function Header() {
  return (
    <div
      className={clsx(
        "w-full h-12 flex items-center px-2",
        "bg-white dark:bg-zinc-900",
        "shadow-x"
      )}
    ></div>
  );
}
