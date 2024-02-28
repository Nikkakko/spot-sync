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
    <header className=" z-50 w-full h-16 font-mono ">
      <div className="flex items-center justify-between h-full min-w-full px-4 max-w-7xl ">
        <Link href="/faq" className="hover:text-black/50 font-bold w-32">
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
              afterSignInUrl={(profile?.profileUrl as string) || "/onboarding"}
            >
              <Button className={cn("text-white", "bg-black")}>Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href={`${profile?.profileUrl || "/onboarding"}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "uppercase font-bold text-base p-0 w-32"
              )}
            >
              Profile{" "}
              <Icons.arrowRight
                className="w-4 h-4 ml-2 text-black/50 
               
              "
              />
            </Link>
            <CustomUserButton
              email={user?.emailAddresses[0].emailAddress}
              userProfileImage={user?.imageUrl}
              userName={user?.firstName + " " + user?.lastName}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
