import * as React from "react";
import HeroCard from "./HeroCard";
import { heroCards } from "@/app/helpers/siteData";
import { cn } from "@/lib/utils";

interface SectionHeroProps {}

const SectionHero: React.FC<SectionHeroProps> = ({}) => {
  const cardGroups = Array.from(
    { length: Math.ceil(heroCards.length / 2) },
    (_, i) => heroCards.slice(i * 2, i * 2 + 2)
  );

  return (
    <section className="grid grid-cols-1 gap-2 font-clash">
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
