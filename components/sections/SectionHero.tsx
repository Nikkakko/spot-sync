import * as React from "react";

import HeroCard from "./HeroCard";
import { Shell } from "../layouts/Shell";
import { heroCards } from "@/app/helpers/siteData";

interface SectionHeroProps {}

const SectionHero: React.FC<SectionHeroProps> = ({}) => {
  return (
    <div className="font-clash  px-2 2xl:px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {heroCards.map(card => (
          <HeroCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default SectionHero;
