import * as React from "react";
import ColorPalette from "../ColorPalette";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface DefaultThemeProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  name: string;
}

const DefaultTheme: React.FC<DefaultThemeProps> = ({
  image,
  name,
  ...props
}) => {
  return (
    <div
      className={cn("bg-white flex flex-col gap-2 w-full p-2", props.className)}
      onClick={props.onClick}
    >
      <div className="bg-bodyBackground  w-full h-auto rounded-sm flex items-start justify-center p-4 py-8">
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
