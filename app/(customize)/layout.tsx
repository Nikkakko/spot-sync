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
    <div className="w-full bg-secondarybg">
      <Shell className="px-2 ">
        <CustomizeHeader />
        {children}
      </Shell>
    </div>
  );
}
