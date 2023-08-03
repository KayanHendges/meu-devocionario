"use client";
import Header from "@components/Header";
import Navigation from "@components/Navigation";
import ThemeSwitcher from "@components/ThemeSwitcher";
import { ThemeProvider } from "next-themes";
import { KeyboardEvent, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function ContainerApp({ children }: Props) {

  return (
    <ThemeProvider attribute="class">
      <div
        className="w-screen h-screen flex flex-col overflow-x-hidden"
      >
        {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
        <main className="flex flex-1 flex-col overflow-y-auto bg-zinc-100 dark:bg-zinc-950">
          {children}
        </main>
        <Navigation />
      </div>
    </ThemeProvider>
  );
}
