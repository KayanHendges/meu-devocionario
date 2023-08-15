"use client";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function DisplayAds() {
  useEffect(() => {
    if (typeof window !== undefined)
      (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      data-development={
        process.env.NODE_ENV === "development" ? true : undefined
      }
      className={twMerge("bg-zinc-500")}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_TAG}`}
        data-ad-slot="6693085294"
        data-adtest={process.env.NODE_ENV === "development" ? "on" : undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
