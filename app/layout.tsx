import type { Metadata } from "next";
import { Fira_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";

const FireSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BgXpert",
  description: "Remove your background",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FireSans.className} ${Sans.variable} antialiased`}>
        <div>
          <Navbar />

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
