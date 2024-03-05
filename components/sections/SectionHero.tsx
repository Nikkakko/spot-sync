import * as React from "react";

import HeroCard from "./HeroCard";
import { Shell } from "../layouts/Shell";
import { heroCards } from "@/app/helpers/siteData";
import ShowCaseCard from "./ShowCaseCard";
import { cn } from "@/lib/utils";

interface SectionHeroProps {}

const SectionHero: React.FC<SectionHeroProps> = ({}) => {
  const firstTwo = heroCards.slice(0, 2);
  const secondTwo = heroCards.slice(2, 4);
  const thirdTwo = heroCards.slice(4, 6);
  const fourthTwo = heroCards.slice(6, 8);
  const fifthTwo = heroCards.slice(8, 10);

  const cardGroups = Array.from(
    { length: Math.ceil(heroCards.length / 2) },
    (_, i) => heroCards.slice(i * 2, i * 2 + 2)
  );

  return (
    <section className="grid grid-cols-1 gap-2 px-2 2xl:px-4 font-clash">
      {cardGroups.map((group, groupIndex) => (
        <section
          key={groupIndex}
          className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:grid-areas-hero"
        >
          {group.map((card, index) => (
            <HeroCard
              key={card.id}
              card={card}
              className={cn(
                index === (groupIndex % 2 === 0 ? 0 : 1)
                  ? "lg:grid-in-left"
                  : "lg:grid-in-right"
              )}
            />
          ))}
        </section>
      ))}
    </section>
  );
};

export default SectionHero;
