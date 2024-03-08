"use client";
import * as React from "react";
import DefaultTheme from "../themes/DefaultTheme";
import { useThemeChoose } from "@/store/themeStore";
import PopTheme from "../themes/PopTheme";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import ColorPalette from "../ColorPalette";

interface ThemesProps {
  image: string;
  name: string;
  coverImage: string;
  bio: string;
}

const themesList = [
  {
    id: "1",
    name: "Default",
    isPro: false,
  },

  {
    id: "2",
    name: "Pop",
    isPro: true,
  },
];

const Themes: React.FC<ThemesProps> = ({ image, name, coverImage, bio }) => {
  const { selectedTheme, setSelectedTheme } = useThemeChoose();
  const { theme, setTheme } = useTheme();

  const themeClass = cn("border-2 rounded-sm cursor-pointer p-2");

  return (
    <div className="flex items-start  gap-2  py-2 px-2 rounded-md">
      <div className="flex flex-col gap-6 flex-1">
        <DefaultTheme
          image={image}
          name={name}
          className={cn(
            themeClass,
            selectedTheme.type === "DEFAULT" ? "border-black  " : "border-white"
          )}
          onClick={() =>
            setSelectedTheme({ color: "DEFAULT", type: "DEFAULT" })
          }
        />

        <PopTheme
          image={image}
          name={name}
          coverImage={coverImage}
          className={cn(
            themeClass,
            selectedTheme.type === "POP" ? "border-black  " : "border-primarybg"
          )}
          // add theme to selected theme
          onClick={() => {
            setSelectedTheme({ color: "DEFAULT", type: "POP" });
          }}
        />
      </div>
    </div>
  );
};

export default Themes;
