import { getToken } from "@/lib/spotify";
import * as React from "react";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col max-w-3xl mx-auto container">
      {children}
    </div>
  );
}
