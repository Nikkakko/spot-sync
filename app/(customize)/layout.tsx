import * as React from "react";
import CustomizeHeader from "@/components/layouts/CustomizeHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize your site - Spot-Sync",
  description: "Create a free unique Spotify profile",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#e5e5e5]">
      <CustomizeHeader />
      {children}
    </div>
  );
}
