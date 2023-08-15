"use client";
import ThemeSwitcher from "@components/ThemeSwitcher";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ContainerApp({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_TAG}`}
        strategy="afterInteractive"
        onError={(e) => console.error("Failed to load google script", e)}
        crossOrigin="anonymous"
      />
      <main className="flex-1 w-full overflow-x-hidden overflow-y-scroll pb-16">
        {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
        <div>{children}</div>
        {/* <Navigation /> */}
      </main>
    </ThemeProvider>
  );
}
