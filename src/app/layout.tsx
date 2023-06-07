import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header/Header";
import { Metadata } from "next";
import React from "react";
import { assetPrefix } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2023 Monetization Questionnaire Results",
  description: "2023 Monetization Questionnaire Results",
  icons: `${assetPrefix}/favicon.ico`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
