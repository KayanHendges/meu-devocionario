"use client";
import Navigation from "@components/Navigation";
import ThemeSwitcher from "@components/ThemeSwitcher";
import AuthContextProvider from "@contexts/Auth/AuthContext";
import UserProvider from "@contexts/User/UserContext";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ContainerApp({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <AuthContextProvider>
        <UserProvider>
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_TAG}`}
            strategy="afterInteractive"
            onError={(e) => console.error("Failed to load google script", e)}
            crossOrigin="anonymous"
          />
          <main className="flex-1 w-full flex flex-col overflow-x-hidden overflow-y-auto pb-16">
            {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
            <div className="w-full flex-1 flex flex-col">{children}</div>
            <Navigation />
          </main>
        </UserProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
