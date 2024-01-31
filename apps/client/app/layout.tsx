import ContainerApp from "@/components/Container/App";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
        className={cn(
          "w-screen h-screen flex flex-col overflow-hidden font-sans antialiased bg-zinc-100 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50",
          fontSans.variable
        )}
      >
        <ContainerApp>{children}</ContainerApp>
      </body>
    </html>
  );
}
