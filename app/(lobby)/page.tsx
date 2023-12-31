import FeaturesSection from "@/components/sections/FeaturesSection";
import SectionHero from "@/components/sections/SectionHero";
import TabletSection from "@/components/sections/TabletSection";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="bg-section-pattern2   flex flex-col flex-1 relative">
        <SectionHero />
        <TabletSection />
        <FeaturesSection />
      </div>
    </main>
  );
}
