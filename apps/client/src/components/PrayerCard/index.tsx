import { Prayer } from "api";
import clsx from "clsx";

interface Props {
  prayer: Prayer;
}

export default function PrayerCard({ prayer }: Props) {
  return (
    <div className={clsx("w-full flex flex-col", "bg-red-500 dark:bg-gray-800")}>
      {prayer.title}
    </div>
  );
}
