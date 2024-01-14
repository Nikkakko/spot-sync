import TabsSection from "@/components/Tabs/Tabs";
import { Shell } from "@/components/layouts/Shell";
import { Tabs } from "@radix-ui/react-tabs";
import * as React from "react";

interface CustomizationProps {}

async function CustomizePage({}: CustomizationProps) {
  return (
    <Shell className="flex items-center ">
      <TabsSection />
    </Shell>
  );
}

export default CustomizePage;
