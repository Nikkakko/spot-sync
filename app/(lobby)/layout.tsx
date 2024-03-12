import { Shell } from "@/components/layouts/Shell";
import SiteFooter from "@/components/layouts/SiteFooter";
import SiteHeader from "@/components/layouts/SiteHeader";
import * as React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-primarybg w-full">
      <Shell className="px-2 lg:px-0">
        <SiteHeader />
        {children}
        <SiteFooter />
      </Shell>
    </div>
  );
}
