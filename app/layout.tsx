import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leego Design PPT — 专业演示设计系统",
  description:
    "根据受众、内容与证据选择设计的 PPT Skill，支持 H5 交互、可编辑 PPTX、PDF 与经过验证的持续规则更新。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
