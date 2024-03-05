import FeaturesSection from "@/components/sections/FeaturesSection";
import SectionHero from "@/components/sections/SectionHero";
import ShowCaseSection from "@/components/SiteCTA";
import TabletSection from "@/components/sections/TabletSection";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="  flex flex-col flex-1 relative ">
        <SectionHero />
        <Banner
          text="JOIN HUNDREDS OF ARTISTS WHO ALREADY MADE THEIR NOISE"
          subText={`It's time to ditch your boring link-in-bio. Make your Noise for free
            and join hundreds of artists who already made their Noise!`}
        />

        <TabletSection />
        {/* <FeaturesSection /> */}
      </div>
      <ShowCaseSection />
    </main>
  );
}

const Banner = ({ text, subText }: { text: string; subText: string }) => {
  return (
    <div className="flex  flex-col gap-4  font-clash max-w-3xl mx-auto whitespace-pre-line  pt-6 lg:pt-20">
      <h1 className="text-black font-bold text-2xl lg:text-5xl text-center ">
        {text}
      </h1>
      <p className=" text-black/60 font-mono font-semibold text-center tracking-tight leading-tight  ">
        {subText}
      </p>
    </div>
  );
};
