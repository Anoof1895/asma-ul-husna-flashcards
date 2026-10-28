import type { Metadata, Viewport } from "next";
import { Amiri, Inter } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "އަސްމާއުލް ޙުސްނާ | 99 Names of Allah Flashcards",
  description: "Learn and memorize the 99 Names of Allah (Asma-ul-Husna) with Dhivehi explanations, illuminated 3D interactive flashcards, search, and progress tracking.",
  keywords: ["Asma-ul-Husna", "99 Names of Allah", "Dhivehi", "Thaana", "Maldives", "Islamic Flashcards"],
  authors: [{ name: "Asma-ul-Husna Flashcards" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0A08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${amiri.variable} ${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0B0A08] text-[#F5EFE6] selection:bg-[#C9A86A]/25 selection:text-[#E2C792]">
        {children}
      </body>
    </html>
  );
}
