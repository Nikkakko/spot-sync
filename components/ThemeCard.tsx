import { ThemeType } from "@/app/helpers/siteData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";
import { Skeleton } from "./ui/skeleton";

interface ThemeCardProps {
  theme: ThemeType;
  image: string;
  name: string;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  theme: { id, type, title },
  image,
  name,
}) => {
  return (
    <div className="border border-white/50 rounded-xl bg-white shadow-md  flex items-center flex-col w-[450px] p-4  h-60 ">
      {type === "default" && (
        <div className="flex items-center gap-4 rounded-xl bg-[#ededed] shadow-md p-1 ">
          <div className="relative w-[120px] h-[120px] rounded-xl overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </div>

          <div className="flex flex-col items-start pr-4">
            <div className="text-base font-medium">{name}</div>
            {/* add bio skileton 4-5 gray lines 2px */}
            <div className="space-y-2">
              <Skeleton className="h-2 w-[150px] bg-black/50" />
              <Skeleton className="h-2 w-[150px] bg-black/50" />
              <Skeleton className="h-2 w-[150px] bg-black/50" />
              <Skeleton className="h-2 w-[150px] bg-black/50" />
              <Skeleton className="h-2 w-[50px] bg-black/50" />
            </div>
          </div>
        </div>
      )}

      <p className="ml-auto mt-auto">
        <span className="font-semibold">{title}</span>
      </p>
    </div>
  );
};

export default ThemeCard;
