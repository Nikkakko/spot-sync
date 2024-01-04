import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { currentUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import FlickeringText from "../FlickeringText";
import db from "@/lib/db";

interface SiteHeaderProps {}

const SiteHeader: React.FC<SiteHeaderProps> = async ({}) => {
  const title = "Spot-Sync";
  const user = await currentUser();

  const profile = await db.userProfile.findFirst({
    where: {
      userId: user?.id as string,
    },
  });

  return (
    <header className=" z-50 w-full h-16">
      <div className="flex items-center justify-between h-full min-w-full px-4 max-w-7xl">
        <Link href="/faq" className="hover:text-black/50 font-bold">
          WHAT?
        </Link>

        <FlickeringText text={title} />

        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "font-bold hover:no-underline hover:text-black/50"
          )}
          href={profile ? `/${profile?.profileUrl}` : "/onboarding"}
        >
          {user ? "My Site" : "Login"}
          <Icons.arrowRight className="w-4 h-4 ml-2 " />
        </Link>
      </div>
    </header>
  );
};

export default SiteHeader;
