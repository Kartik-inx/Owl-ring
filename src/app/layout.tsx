import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Owl Ring | The Future of Wearable Intelligence",
  description: "Experience the pinnacle of wearable technology with Owl Ring. Minimal luxury, cinematic design, and intelligent health tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.variable} font-body bg-background text-foreground min-h-screen antialiased selection:bg-accent selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
