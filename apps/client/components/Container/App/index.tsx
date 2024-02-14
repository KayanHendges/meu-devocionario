"use client";
import { SignInDialogProvider } from "@/components/Dialogs/SignIn";
import NavSideBar from "@/components/NavSidebar";
import Navigation from "@/components/Navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import AuthContextProvider from "@/contexts/Auth/AuthContext";
import UserProvider from "@/contexts/User/UserContext";
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
          <SignInDialogProvider>
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_TAG}`}
              strategy="afterInteractive"
              onError={(e) => console.error("Failed to load google script", e)}
              crossOrigin="anonymous"
            />
            <main className="w-full flex flex-1 mobile:flex-col overflow-x-hidden overflow-y-auto mobile:pb-16">
              <NavSideBar className="mobile:hidden" />
              {process.env.NODE_ENV === "development" && (
                <ThemeSwitcher className="hidden mobile:flex " />
              )}
              <div className="mobile:w-full flex-1 flex flex-col">
                {children}
              </div>
              <Navigation className="hidden mobile:flex" />
            </main>
          </SignInDialogProvider>
        </UserProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
