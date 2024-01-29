import ContainerApp from "@/components/Container/App";
import "./globals.css";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu devocionário",
  description: "O seu devocionário online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt_BR" suppressHydrationWarning>
      <body
        className={twMerge(
          inter.className,
          "w-screen h-screen flex flex-col overflow-hidden bg-zinc-100 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50"
        )}
      >
        <ContainerApp>{children}</ContainerApp>
      </body>
    </html>
  );
}
