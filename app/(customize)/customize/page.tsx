import TabsSection from "@/components/Tabs/Tabs";
import { Tabs } from "@radix-ui/react-tabs";
import * as React from "react";

interface CustomizationProps {}

async function CustomizePage({}: CustomizationProps) {
  return (
    <div>
      <TabsSection />
    </div>
  );
}

export default CustomizePage;
