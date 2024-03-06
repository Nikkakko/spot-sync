import * as React from "react";
import CustomizeHeader from "@/components/layouts/CustomizeHeader";
import { Metadata } from "next";
import { Shell } from "@/components/layouts/Shell";

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
    <Shell className=" px-0">
      <CustomizeHeader />
      {children}
    </Shell>
  );
}
