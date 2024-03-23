import { faqCard } from "@/app/helpers/siteData";
import { Shell } from "@/components/layouts/Shell";
import * as React from "react";

interface FaqPageProps {}

const FaqPage: React.FC<FaqPageProps> = ({}) => {
  const colorVariants = {
    violet: "bg-violet-500",
    blue: "bg-blue-500",
    pink: "bg-pink-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
  } as const;

  return (
    <>
      <section className="py-14 border-t border-[#ccc]">
        <Shell
          className="flex flex-col gap-4 text-center p-0  max-w-xs min-h-fit"
          as="div"
        >
          <h1 className="text-5xl tracking-tight font-bold">What?</h1>
          <p className="leading-6  text-lg text-muted-foreground">
            Spot-Sync is a free, simple musician *website builder* that helps
            you create a unique website in seconds just from your Spotify
            profile.
          </p>
        </Shell>
      </section>
      <div className="bg-section-pattern2 flex flex-col gap-4 py-10 flex-1 relative ">
        {faqCard.map((card, index) => (
          <div
            key={index}
            className="flex flex-col p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg"
          >
            <div
              className={`w-full h-1 rounded-sm mb-2 ${
                colorVariants[card.color]
              }`}
            />
            <h1 className="text-lg font-bold">{card.title}</h1>
            <p className="leading-6 text-base text-muted-foreground">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FaqPage;
