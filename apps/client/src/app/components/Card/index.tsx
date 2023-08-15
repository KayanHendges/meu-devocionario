import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <div
      className={clsx(
        "card-compact rounded-lg ring-1 ring-zinc-300 dark:ring-black",
        "bg-zinc-50 dark:bg-zinc-900"
      )}
    >
      <div className="card-body">{children}</div>
    </div>
  );
}
