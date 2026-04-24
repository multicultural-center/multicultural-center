import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "파주 다문화센터 | 무료 한국어교실 | 경기서북부 다문화센터",
  description: "파주 문산 위치 다문화센터. 무료 한국어교육 운영. 외국인 및 다문화가정 지원 프로그램 제공.",
  
  verification: {
    other: {
      "naver-site-verification": "a22ac61ecf6d500130d72d4fa69c04919039d85c",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
