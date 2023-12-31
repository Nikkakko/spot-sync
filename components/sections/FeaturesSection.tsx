import * as React from "react";
import { Shell } from "../layouts/Shell";
import { featuresCard } from "@/app/helpers/siteData";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

interface FeaturesSectionProps {}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({}) => {
  return (
    <Shell className="pb-40 max-w-6xl" variant="features">
      {featuresCard.map(card => (
        <Card
          key={card.title}
          className="flex flex-col px-3 py-4  max-w-[298px] "
        >
          <CardHeader className="flex items-center mb-3 p-0">
            {/* <Image
              src={card.icon}
              alt={card.title}
              className="w-12 h-12 mr-4"
              width="48"
              height="48"
            /> */}
          </CardHeader>
          <CardContent className="p-0 mb-4">
            <CardTitle className="p-0 text-2xl font-semibold leading-7 ">
              {card.title}
            </CardTitle>
          </CardContent>

          <CardFooter className="p-0 ">
            <CardDescription className="leading-normal text-base">
              {card.description}
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
    </Shell>
  );
};

export default FeaturesSection;
