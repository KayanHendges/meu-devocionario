"use client";
import Header from "@components/Header";
import Navigation from "@components/Navigation";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ContainerApp({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <div className="w-screen h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex flex-1 flex-col overflow-y-auto bg-zinc-100 dark:bg-zinc-950">
          {children}
          <Navigation />
        </main>
      </div>
    </ThemeProvider>
  );
}
