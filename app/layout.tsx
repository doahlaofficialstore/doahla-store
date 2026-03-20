import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doahla Official Store | Best In-Game Currency in India",
  description: "Top up MLBB, BGMI, and CoC instantly at Doahla Official Store. Safe, fast, and reliable.",
  // THIS IS YOUR GOOGLE VERIFICATION KEY
  verification: {
    google: "HV3tDjQ5EOCQBp80WyO-NZdPxGktwlb0rkxjUD_17lk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}