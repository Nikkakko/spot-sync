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

interface TabletSectionProps {}

const TabletSection: React.FC<TabletSectionProps> = ({}) => {
  return (
    <section className="container flex justify-center items-center flex-col relative pb-20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full  "
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
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
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default TabletSection;
