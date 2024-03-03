"use client";
import * as React from "react";
import ColorPalette from "./ColorPalette";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface DefaultThemeProps {
  image: string;
  name: string;
}

const DefaultTheme: React.FC<DefaultThemeProps> = ({ image, name }) => {
  const { theme } = useTheme();

  return (
    <div className="bg-white flex flex-col gap-2">
      <div className="bg-bodyBackground w-[468px] h-auto rounded-sm flex items-start justify-center p-4 py-8">
        <div className="bg-cardBackground flex items-stat gap-2 p-2 rounded-lg w-full">
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="rounded-lg object-cover"
          />
          <div className="flex flex-col gap-2 w-full">
            <h4 className="text-primaryText text-lg text-primaryTextColor">
              {name}
            </h4>

            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-2 w-full bg-bodyBackground" />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#f5f5f5] border-secondaryText border rounded-md px-4 py-2 flex justify-center">
        <ColorPalette />
      </div>

      {/* add default theme text */}
      <h4 className="text-center text-sm text-secondaryText">Default Theme</h4>
    </div>
  );
};

export default DefaultTheme;
