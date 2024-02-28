"use client";
import * as React from "react";
import { collorPalette } from "@/app/helpers/siteData";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ColorPaletteProps {}

const ColorPalette: React.FC<ColorPaletteProps> = ({}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {collorPalette.map(color => (
        <button
          key={color.name}
          className={cn(
            "w-6 h-6 select-none  rounded-full cursor-pointer transition duration-300 ease-in-out hover:scale-110 transform hover:shadow-lg",
            theme === color.name
              ? "scale-110 shadow-lg"
              : "border-2 border-primarybg backdrop-blur-md"
          )}
          style={{ backgroundColor: color.color }}
          onClick={() => {
            setTheme(color.name);
          }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
