import TabsSection from "@/components/Tabs/Tabs";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";
import * as React from "react";
import { redirect } from "next/navigation";

interface CustomizationProps {}

async function CustomizePage({}: CustomizationProps) {
  const user = await currentUser();
  const userProfile = await db.userProfile.findFirst({
    where: {
      userId: user?.id as string,
    },
  });

  if (!userProfile || !user) {
    return redirect("/");
  }

  return <TabsSection />;
}

export default CustomizePage;
