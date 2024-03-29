import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {
  currentUser,
  SignOutButton,
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import db from "@/lib/db";
import { Icons } from "../icons";
import CustomUserButton from "../modals/CustomUserButton";
import { checkSubscription, subEndDate } from "@/lib/subscription";

interface SiteHeaderProps {}

const SiteHeader: React.FC<SiteHeaderProps> = async ({}) => {
  const title = "S-Sync";
  const user = await currentUser();

  const [profile, endDate, isPro] = await Promise.all([
    db.userProfile.findFirst({ where: { userId: user?.id as string } }),
    subEndDate(),
    checkSubscription(),
  ]);

  return (
    <header className="z-50 w-full h-16 font-clash">
      <div className="flex items-center justify-between h-full min-w-full  max-w-7xl ">
        <Link
          href="/faq"
          className="hover:text-black/50 font-bold w-16 md:w-[192px]"
        >
          WHAT?
        </Link>

        <Link
          href="/"
          className="text-2xl font-bold text-black uppercase 
          hover:text-black/50 transition-colors duration-200 ease-in-out
        "
        >
          {title}
        </Link>

        <div className="flex items-center space-x-2">
          <SignedOut>
            <SignInButton
              afterSignInUrl={(user && profile?.profileUrl) || "/onboarding"}
              mode="modal"
            >
              <Button className={cn("text-white", "bg-black")}>Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href={`${(user && profile?.profileUrl) || "/onboarding"}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "hidden md:flex gap-1 uppercase font-bold text-base p-0 w-16 md:w-32 tracking-wider group"
              )}
            >
              Profile{" "}
              <Icons.moveRight
                className="w-4 h-4 ml-2 text-black/50 
              group-hover:text-black transition-colors duration-200 ease-in-out
              "
              />
            </Link>

            <CustomUserButton
              email={user?.emailAddresses[0].emailAddress}
              userProfileImage={user?.imageUrl}
              userName={user?.firstName + " " + user?.lastName}
              profileUrl={profile?.profileUrl}
              isPro={isPro}
              subEnd={endDate}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
