import * as React from "react";
import { HeroCardProps } from "./SectionHero";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  card: HeroCardProps;
};

const HeroCard: React.FC<Props> = ({ card }) => {
  const { title, description, color, buttonColor, buttonText } = card;
  return (
    <div
      className={cn("lg:p-10 p-4  h-[300px] 2xl:h-[700px]  ")}
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col justify-between h-full ">
        <div className="flex flex-col gap-2 lg:gap-4 text-start w-full">
          <h1 className="2xl:text-4xl  lg:text-2xl text-base font-bold text-primarybg block whitespace-pre-line ">
            {title}
          </h1>
          <p className="text-primarybg/50 font-mono font-semibold tracking-tight leading-tight lg:leading-normal max-w-md">
            {description}
          </p>
        </div>

        <Button
          className={cn(
            "text-white py-6 px-4 mt-4 rounded-md uppercase font-bold w-full text-xl  hover:scale-105 hover:transition-transform hover:duration-200"
          )}
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default HeroCard;
