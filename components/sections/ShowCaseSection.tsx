import * as React from "react";
import { Shell } from "../layouts/Shell";
import { showCaseText } from "@/app/helpers/siteData";
import { Button } from "../ui/button";

interface ShowCaseSectionProps {}

const ShowCaseSection: React.FC<ShowCaseSectionProps> = ({}) => {
  return (
    <Shell className="flex flex-col py-20   bg-primarybg ">
      <div className="flex flex-col mx-auto items-start ">
        {showCaseText.map((text, index) => (
          <p
            className="text-5xl whitespace-pre-line opacity-50 leading-[1.2] font-bold "
            key={index}
          >
            {text}
          </p>
        ))}
        <div className="mt-6 flex flex-col items-start text-start ">
          <h1 className="text-black font-semibold text-5xl">On Spotify?</h1>
          <Button
            className="text-5xl text-blue-600 p-0 mt-1 hover:no-underline"
            variant="link"
          >
            Make Your Noise {/* todo sign in modal */}
          </Button>
        </div>
      </div>
    </Shell>
  );
};

export default ShowCaseSection;
