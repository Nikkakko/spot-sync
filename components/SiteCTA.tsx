import * as React from "react";
import { Shell } from "./layouts/Shell";
import { showCaseText } from "@/app/helpers/siteData";
import { Button, buttonVariants } from "./ui/button";
import { useUser, redirectToSignIn, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import db from "@/lib/db";

interface SiteCtaProps {}

const SiteCta: React.FC<SiteCtaProps> = async ({}) => {
  const user = await currentUser();

  const profile = await db.userProfile.findFirst({
    where: {
      userId: user?.id as string,
    },
  });

  return (
    <Shell
      className="flex flex-col py-20 cursor-default   bg-primarybg"
      as="article"
    >
      <div className="flex flex-col mx-auto items-start ">
        {showCaseText.map((text, index) => (
          <p
            className="text-5xl whitespace-pre-line opacity-50 leading-[1.2] font-bold hover:opacity-100 transition-opacity duration-200 ease-in-out "
            key={index}
          >
            {text}
          </p>
        ))}
        <div className="mt-6 flex flex-col items-start text-start ">
          <h1 className="text-black font-semibold text-5xl">On Spotify?</h1>

          <a
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-5xl text-blue-600 p-0 mt-1 hover:no-underline"
            )}
            href={profile ? `/${profile?.profileUrl}` : "/"}
          >
            Make Your Noise {/* todo sign in modal */}
          </a>
        </div>
      </div>
    </Shell>
  );
};

export default SiteCta;
