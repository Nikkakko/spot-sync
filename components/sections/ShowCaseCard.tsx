import Link from "next/link";
import * as React from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { HeroCardProps } from "@/app/helpers/siteData";

interface ShowCaseCardProps {
  card: HeroCardProps;
}

const ShowCaseCard: React.FC<ShowCaseCardProps> = ({ card }) => {
  const { href, color } = card;

  return (
    <div
      className="h-[300px] 2xl:h-[700px] relative"
      style={{
        backgroundColor: color,
      }}
    >
      <Link
        href="/"
        className="z-20 text-primarybg
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase font-clash  text-xl 2xl:text-4xl font-bold
              hover:scale-105 hover:transition-transform hover:duration-200 tracking-widest group"
        target="_blank"
      >
        <div className="flex gap-2 items-center">
          <Icons.moveRight
            className="w-10 h-10
                group-hover:animate-pulse
                "
          />
          {href?.split("/")[1]}
        </div>
      </Link>
      <div
        className={cn(
          "bg-noise-pattern absolute inset-0 mix-blend-overlay opacity-75 bg-opacity-50"
        )}
      />
    </div>
  );
};

export default ShowCaseCard;
