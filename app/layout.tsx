import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leego Design PPT — 专业演示设计系统",
  description:
    "从同一语义源生成自适应网页演示、可编辑 PPTX 与稳定版式 PDF 的专业演示设计 Skill。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
