import * as React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { stickers } from "@/app/helpers/siteData";
import { Shell } from "../layouts/Shell";
import HeroCard from "./HeroCard";

interface SectionHeroProps {}

export interface HeroCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  buttonColor: string;
  buttonText: string;
}

const heroCards: HeroCardProps[] = [
  {
    id: "1",
    title: `THE MODERN LINK IN
    BIO MADE FOR ARTISTS,
    MUSICIANS AND BANDS`,
    description: `Take your link-in-bio to the next level with Noise, promote your music and latest releases, show your links and engage with your fans`,
    color: "#301b04",
    buttonColor: "#d74d00",
    buttonText: "Make Your Profile",
  },
  {
    id: "2",
    title: `YOUR MUSIC, LINKS,
    SOCIALS AND LATEST
    RELEASES IN ONE PLACE!`,
    description: `Noise is your new digital home as an artist. It's you link in bio that is not boring, looks good and shows-off your music and links.`,
    color: "#56001a",
    buttonColor: "#d31b52",
    buttonText: "Make Your Profile",
  },
  {
    id: "3",
    title: `STAND OUT FROM
    THE REST WITH UNIQUE
    THEMES AND COLORS`,
    description: `Your link in bio should be as unique as your music! with Noise, yours will look beautifully different to best suit your vibe and style.`,
    color: "#2a174a",
    buttonColor: "#7300ce",
    buttonText: "Make Your Profile",
  },
  {
    id: "4",
    title: `LOOKS GOOD EVERYWHERE
    A WEBSITE ON DESKTOP,
    A LINK-IN-BIO ON MOBILE!`,
    description: `Your Noise is designed to look great on all devices. It'll look like a mini website on desktop and a link-in-bio on mobile.`,
    color: "#072a3c",
    buttonColor: "#00a4ca",
    buttonText: "Make Your Profile",
  },
  {
    id: "5",
    title: `KNOW YOUR FANS
    AND KEEP PULSE ON
    EVERYTHING!`,
    description: `See how your fans are interacting with your Noise, who they are, where they are coming from and what interests them about you!`,
    color: "#213700",
    buttonColor: "#2ab500",
    buttonText: "Make Your Profile",
  },
];

const SectionHero: React.FC<SectionHeroProps> = ({}) => {
  return (
    <div className="font-clash max-w-full px-2 2xl:px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {heroCards.map(card => (
          <HeroCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default SectionHero;
