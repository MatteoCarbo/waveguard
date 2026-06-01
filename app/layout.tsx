import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WaveGuard — Portugal Beach Safety",
  description:
    "Know before you go. Real-time wave, wind, and weather safety scores for Portugal's best beaches.",
  openGraph: {
    title: "WaveGuard",
    description: "Is it safe to swim today? Check Portugal beach conditions.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0284c7",
  viewportFit: "cover", // iPhone notch / Dynamic Island safe area
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
