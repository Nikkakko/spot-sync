import TabsSection from "@/components/Tabs/Tabs";
import { Shell } from "@/components/layouts/Shell";
import { currentUser } from "@clerk/nextjs";
import { Tabs } from "@radix-ui/react-tabs";
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

  if (!userProfile) {
    return redirect("/");
  }

  return (
    <Shell className="flex items-center ">
      <TabsSection />
    </Shell>
  );
}

export default CustomizePage;
