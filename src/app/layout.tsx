import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LightCursor from "@/components/NeonCursor";

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
      <body className={inter.className}>
        <LightCursor />
        {children}
      </body>
    </html>
  );
}
