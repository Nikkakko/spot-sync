import { getToken } from "@/lib/spotify";
import * as React from "react";
import { createCookie } from "../_actions/userProfile";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col container max-w-2xl ">
      {children}
    </div>
  );
}
