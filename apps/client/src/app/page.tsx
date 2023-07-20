"use client";

import PrayerCard from "@components/PrayerCard";
import { prayersProviders } from "@providers/api/prayers";
import { Prayer } from "api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const { theme, setTheme } = useTheme();

  const watchMatchMedia = (event: MediaQueryListEvent) =>
    setTheme(event.matches ? "dark" : "light");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", watchMatchMedia);
    return () => mq.removeEventListener("change", watchMatchMedia);
  }, []);

  const fetchPrayers = async () => {
    const { list } = await prayersProviders.listPrayers();
    setPrayers(list);
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <input
          type="checkbox"
          className="toggle"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        {/* {theme || "car "} */}
      </div>
      {prayers.map((prayer) => (
        <PrayerCard key={prayer.id} prayer={prayer} />
      ))}
    </div>
  );
}
