import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cherry WoO Photography | Cherry",
  description:
    "Cherry 的攝影作品集 — 新中式、婚禮、職人形象、活動、全家福與時尚寫真。以溫暖細膩的視角，記錄每一個不經意的瞬間。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
