import * as React from "react";
import ColorPalette from "../ColorPalette";
interface ThemesProps {}

const Themes: React.FC<ThemesProps> = ({}) => {
  return (
    <div className="flex items-center gap-2 bg-white py-2 px-4 rounded-md">
      <ColorPalette />
    </div>
  );
};

export default Themes;
