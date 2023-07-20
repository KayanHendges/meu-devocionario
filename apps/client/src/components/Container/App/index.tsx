"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ContainerApp({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <main className="w-screen h-screen flex flex-col bg-white dark:bg-black">
        {children}
      </main>
    </ThemeProvider>
  );
}
