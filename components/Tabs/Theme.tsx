import { themes } from "@/app/helpers/siteData";
import * as React from "react";
import ThemeCard from "../ThemeCard";

interface ThemeProps {
  image: string;
  name: string;
}

const Theme: React.FC<ThemeProps> = ({ image, name }) => {
  return (
    <div
      className="
      grid grid-cols-1 
      grid-rows-1 
      gap-4
      "
    >
      {themes.map(theme => {
        return (
          <ThemeCard key={theme.id} theme={theme} image={image} name={name} />
        );
      })}
    </div>
  );
};

export default Theme;
