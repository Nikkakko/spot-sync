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

interface TabletSectionProps {}

const TabletSection: React.FC<TabletSectionProps> = ({}) => {
  return (
    <Shell className=" justify-center items-center pb-20">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-full  "
      >
        <CarouselContent>
          {slides.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="flex items-center justify-center "
            >
              <div className="relative  w-[1146px] h-[686px]  rounded-xl overflow-hidden">
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
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </Shell>
  );
};

export default TabletSection;
