import type { Metadata } from "next";
import { Be_Vietnam_Pro, Mulish, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SellOS — Nền Tảng AI Bán Hàng Tự Động",
  description:
    "Nền tảng AI all-in-one giúp bạn xây hệ thống bán hàng tự động trong 7 ngày. Chọn template, chat với AI ngay trên SellOS — không cần code, không cần thuê dev.",
  openGraph: {
    title: "SellOS — Từ ý tưởng đến hệ thống bán hàng trong 7 ngày",
    description:
      "Nền tảng AI all-in-one: chọn template, chat với AI, deploy — tất cả trong 1 nền tảng.",
    type: "website",
    siteName: "SellOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "SellOS — Nền Tảng AI Bán Hàng Tự Động",
    description: "Xây hệ thống bán hàng tự động trong 7 ngày với AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="vi"
        className={`${beVietnamPro.variable} ${mulish.variable} ${jetbrainsMono.variable}`}
      >
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
