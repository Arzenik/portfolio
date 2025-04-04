import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LightCursor from "@/components/NeonCursor";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurélien Derouet - Portfolio",
  description: "Portfolio de Aurélien Derouet, développeur web fullstack",
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
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
