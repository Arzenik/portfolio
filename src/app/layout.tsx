import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LightCursor from "@/components/NeonCursor";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Aurélien SEBE",
  description: "Portfolio développeur web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} transition-colors duration-200`}>
        <ThemeProvider>
          <LightCursor />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
