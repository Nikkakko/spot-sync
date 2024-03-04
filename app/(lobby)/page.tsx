import FeaturesSection from "@/components/sections/FeaturesSection";
import SectionHero from "@/components/sections/SectionHero";
import ShowCaseSection from "@/components/SiteCTA";
import TabletSection from "@/components/sections/TabletSection";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col ">
      <div className="  flex flex-col flex-1 relative ">
        <SectionHero />
        <div className="flex  flex-col gap-4  font-clash max-w-2xl mx-auto whitespace-pre-line  pt-20">
          <h1 className="text-black font-bold text-5xl text-center ">
            JOIN HUNDREDS OF ARTISTS WHO ALREADY MADE THEIR NOISE
          </h1>
          <p className=" text-black/60 font-mono font-semibold text-center tracking-tight leading-tight  ">
            {` It's time to ditch your boring link-in-bio. Make your Noise for free
            and join hundreds of artists who already made their Noise!`}
          </p>
        </div>
        <TabletSection />
        {/* <FeaturesSection /> */}
      </div>
      <ShowCaseSection />
    </main>
  );
}
