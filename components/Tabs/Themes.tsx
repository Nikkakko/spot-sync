import * as React from "react";
import DefaultTheme from "../DefaultTheme";

interface ThemesProps {
  image: string;
  name: string;
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

const Themes: React.FC<ThemesProps> = ({ image, name }) => {
  return (
    <div className="flex items-center gap-2 bg-white py-2 px-2 rounded-md">
      <DefaultTheme image={image} name={name} />
    </div>
  );
};

export default Themes;
