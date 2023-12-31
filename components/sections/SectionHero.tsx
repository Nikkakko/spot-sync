import * as React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { stickers } from "@/app/helpers/siteData";
import { Shell } from "../layouts/Shell";

interface SectionHeroProps {}

const SectionHero: React.FC<SectionHeroProps> = ({}) => {
  return (
    <Shell>
      <div className="flex flex-col items-center py-[120px] text-center">
        <h1 className="text-5xl font-bold text-center whitespace-pre-line letter-spacing-tight mb-10">
          Turn your <span className="text-green-500">Spotify</span>
          <br />
          profile into a uniquely
          <br />
          designed website
        </h1>

        <form>
          <Button className="capitalize">Create your site</Button>
        </form>
      </div>

      <div className="hidden lg:block">
        {stickers.map((sticker, idx) => (
          <span
            key={sticker.id}
            className={cn(
              sticker.color,
              `text-xl font-bold uppercase px-4 py-2 m-2 rounded-full
                  hover:transform hover:scale-110 hover:rotate-12
                  absolute z-index: -1
                

                  /* add random pozition */

                  ${idx === 0 && "left-16 top-0"}
                  ${idx === 1 && "right-16 top-0"}
                  ${idx === 2 && "left-36 top-52"}
                  ${idx === 3 && "right-14 top-40"}
                  ${idx === 4 && "left-16 top-80"}
                  ${idx === 5 && "right-16 top-80"}
                  ${idx === 6 && "right-56 top-96"}
                  ${idx === 7 && "left-56 top-96"}
                  ${idx === 8 && "left-52 top-16"}
                  ${idx === 9 && "right-44 top-12"}
                  

                  
                  
               
                 
                  /* rotation based on index */
                  ${idx === 0 && "rotate-[-15deg]"}
                  ${idx === 1 && "rotate-[15deg]"}
                  ${idx === 2 && "rotate-[15deg]"}
                  ${idx === 3 && "rotate-[-15deg]"}
                  ${idx === 4 && "rotate-[-15deg]"}
                  ${idx === 5 && "rotate-[15deg]"}
                  ${idx === 6 && "rotate-[15deg]"}
                  ${idx === 7 && "rotate-[-15deg]"}
                  ${idx === 8 && "rotate-[15deg]"}
                  ${idx === 9 && "rotate-[-15deg]"}

                `
            )}
          >
            {sticker.item}
          </span>
        ))}
      </div>
    </Shell>
  );
};

export default SectionHero;
