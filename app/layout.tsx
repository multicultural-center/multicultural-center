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
  title: "파주 문산 다문화센터 | 무료 한국어교실 | (사)경기서북부 다문화센터",

  description:
    "파주 문산 무료 한국어교실 | 외국인 근로자 | 다문화가정 | 매주 토요일 오후 2시",

  verification: {
    other: {
      "naver-site-verification":
        "a22ac61ecf6d500130d72d4fa69c04919039d85c",

      "google-site-verification":
        "MITb-x6JZiSgJhR5HAXj_ShUwuAvqxu6CjV0PNDRlfY",
    },
  },

  openGraph: {
    title: "파주 문산 무료 한국어교실",
    description:
      "외국인 근로자 / 다문화가정 누구나 참여 가능 | 예약 없이 참여 가능",

    url: "https://www.gnwmc.com",

    siteName: "(사)경기서북부 다문화센터",

    images: [
      {
        url: "https://www.gnwmc.com/korean-class-promo.png",
        width: 1200,
        height: 630,
      },
    ],

    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "파주 문산 무료 한국어교실",
    description: "매주 토요일 오후 2시 / 예약 없이 참여 가능",
    images: ["https://www.gnwmc.com/korean-class-promo.png"],
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
