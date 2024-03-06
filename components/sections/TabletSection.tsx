"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { slides } from "@/app/helpers/siteData";
import Image from "next/image";
import { Shell } from "../layouts/Shell";
import { cn } from "@/lib/utils";

interface TabletSectionProps {}

const TabletSection: React.FC<TabletSectionProps> = ({}) => {
  return (
    <Shell
      className="justify-center items-center px-0 py-4 lg:py-20 "
      variant="cta"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full  max-w-6xl "
      >
        <CarouselContent className="">
          {slides.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="flex items-center justify-center "
            >
              <div
                className={cn(
                  "relative w-[300px] h-[250px]  lg:w-[1146px] lg:h-[686px]  rounded-xl overflow-hidden"
                  //eachh slide basis-1/3 of the screen width
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  quality={100}
                  sizes="(min-width: 1280px) 1146px, calc(94.79vw - 48px)"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="-right-2 lg:-right-12" />
        <CarouselPrevious className="-left-2 lg:-left-12" />
      </Carousel>
    </Shell>
  );
};

export default TabletSection;
