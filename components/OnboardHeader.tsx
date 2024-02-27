"use client";
import * as React from "react";
import { Icons } from "./icons";
import { useUserInfoStore } from "@/hooks/user-info";
import { Button } from "./ui/button";

interface OnboardHeaderProps {}

const stepTexts = {
  selectArtist: {
    title: "Which one is your Spotify artist profile?",
    description:
      "We know your music is unique but names clash! Make sure you re selecting the right profile.",
  },
  createProfile: {
    title: "Nice! Lets claim your unique site handle!",
    description:
      "Your Spot-Sync handle is unique, choose a cool short name and don t worry, you can change it later!",
  },
  default: {
    title: "What s your artist name?",
    description:
      "We are going to use it to search for your profile on Spotify...",
  },
};

const OnboardHeader: React.FC<OnboardHeaderProps> = ({}) => {
  const { step, setStep, nullArtist } = useUserInfoStore();

  const currentStepTexts = stepTexts[step || "default"];

  const handleBack = () => {
    if (step === "selectArtist") {
      setStep("default");
      nullArtist();
    } else if (step === "createProfile") {
      setStep("selectArtist");
    }
  };
  return (
    <div className="flex flex-col   max-w-[250px] md:max-w-xs lg:max-w-sm ">
      {step !== "default" && (
        <Button
          variant="secondary"
          className="absolute top-12 left-0"
          onClick={handleBack}
        >
          <Icons.arrowLeft className="w-6 h-6 hover:text-gray-400 transition-all" />
        </Button>
      )}
      <h1 className=" text-5xl font-bold text-gray-900 leading-none  tracking-tight sm:text-2xl  lg:text-4xl ">
        {currentStepTexts.title}
      </h1>
      <p className="text-sm font-semibold text-gray-400  mt-4  tracking-tight sm:text-md ">
        {currentStepTexts.description}
      </p>
    </div>
  );
};

export default OnboardHeader;
