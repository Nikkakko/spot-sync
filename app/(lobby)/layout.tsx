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
    <Shell>
      <SiteHeader />
      {children}
      <SiteFooter />
    </Shell>
  );
}
