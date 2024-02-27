import { getToken } from "@/lib/spotify";
import Link from "next/link";
import * as React from "react";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col w-full  mx-auto container">
      {children}
    </div>
  );
}
