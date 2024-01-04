import CustomizeHeader from "@/components/layouts/CustomizeHeader";

import * as React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col ">
      <CustomizeHeader />
      {children}
    </div>
  );
}
