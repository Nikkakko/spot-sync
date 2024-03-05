import SiteFooter from "@/components/layouts/SiteFooter";
import SiteHeader from "@/components/layouts/SiteHeader";
import * as React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col container px-2 2xl:px-4 pb-10 mx-auto">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
