import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";

const FireSans = Fira_Sans({
  variable: "--font-fira-sans",
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
      <body className={`${FireSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
