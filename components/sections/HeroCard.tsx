"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { HeroCardProps } from "@/app/helpers/siteData";
import Link from "next/link";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

interface Props extends React.HTMLProps<HTMLDivElement> {
  card: HeroCardProps;
}
const HeroCard: React.FC<Props> = ({ card, ...props }) => {
  const { title, description, color, buttonColor, buttonText, href, showCase } =
    card;

  const buttonClass = cn(
    "text-white py-2 2xl:py-10 px-4 mt-4 rounded-md uppercase font-bold w-full text-base 2xl:text-xl  hover:scale-105 hover:transition-transform hover:duration-200 tracking-widest ",
    buttonVariants({ variant: "default" }),
    //add offset and shadow to button
    "shadow-md offset-md-2 offset-md-2"
  );

  return (
    <div
      className={cn(
        "lg:p-10 p-4  h-[300px] 2xl:h-[700px] relative",
        props.className
      )}
      style={{
        backgroundColor: color,
      }}
    >
      <div className="flex flex-col justify-between h-full ">
        <div className="flex flex-col gap-2 lg:gap-4 text-start w-full">
          <h1 className="2xl:text-4xl text-base leading-none lg:text-2xl font-bold text-primarybg block whitespace-pre-line ">
            {title}
          </h1>
          <p className="text-primarybg/50 font-mono font-semibold  text-xs 2xl:text-base tracking-tight leading-tight lg:leading-normal max-w-md">
            {description}
          </p>
        </div>

        {showCase && (
          <>
            <Link
              href={href as string}
              className="z-20 text-primarybg
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase font-clash  text-xl 2xl:text-4xl font-bold
              hover:scale-105 hover:transition-transform hover:duration-200 tracking-widest group"
              target="_blank"
            >
              <div className="flex gap-2 items-center">
                <Icons.moveRight
                  className="w-10 h-10
                group-hover:animate-pulse
                "
                />
                {href?.split("/")[1]}
              </div>
            </Link>
            <div
              className={cn(
                "bg-noise-pattern absolute inset-0 mix-blend-overlay opacity-75 bg-opacity-50"
              )}
            />
          </>
        )}

        {showCase === undefined && (
          <>
            <SignedOut>
              <SignInButton afterSignInUrl={"/onboarding"} mode="modal">
                <Button
                  className={buttonClass}
                  style={{
                    backgroundColor: buttonColor,
                  }}
                >
                  {buttonText}
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link
                href={"/onboarding"}
                className={cn(buttonClass)}
                style={{
                  backgroundColor: buttonColor,
                }}
              >
                {buttonText}
              </Link>
            </SignedIn>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroCard;
