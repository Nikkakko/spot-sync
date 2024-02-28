"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { collorPalette } from "@/app/helpers/siteData";
interface ThemesProps {}

const CollorPallete: React.FC<ThemesProps> = ({}) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
  };

  return (
    <div className="flex items-center gap-2">
      {collorPalette.map(color => (
        <div
          key={color.name}
          className="w-20 h-20 select-none rounded-full cursor-pointer transition duration-300 ease-in-out hover:scale-110 transform hover:shadow-lg"
          style={{ backgroundColor: color.color }}
          onClick={() => handleThemeChange(color.name)}
        ></div>
      ))}
    </div>
  );
};

export default CollorPallete;
