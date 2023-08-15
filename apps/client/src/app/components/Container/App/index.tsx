"use client";
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
      <main className="flex-1 w-full overflow-x-hidden overflow-y-scroll pb-16">
        {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
        <div>{children}</div>
        {/* <Navigation /> */}
      </main>
    </ThemeProvider>
  );
}
