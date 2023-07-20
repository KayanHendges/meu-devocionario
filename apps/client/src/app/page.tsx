"use client";

import PrayerCard from "@components/PrayerCard";
import { prayersProviders } from "@providers/api/prayers";
import { Prayer } from "api";
import { ChangeEvent, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export default function Home() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [theme, setTheme] = useState<ThemeMode>(
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as ThemeMode)
      : "light"
  );

  const handleTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const mode = event.target.value === "light" ? "dark" : "light";
    typeof window !== "undefined" && localStorage.setItem("theme", mode);
    setTheme(mode);
  };

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
          value={theme}
          onChange={handleTheme}
        />
      </div>
      {prayers.map((prayer) => (
        <PrayerCard key={prayer.id} prayer={prayer} />
      ))}
    </div>
  );
}
