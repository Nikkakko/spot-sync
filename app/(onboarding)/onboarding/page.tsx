import * as React from "react";
import ArtistProfileCard from "@/components/ArtistProfileCard";
import UserForm from "@/components/UserForm";
import { getToken } from "@/lib/spotify";
import OnboardHeader from "@/components/OnboardHeader";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface OnBoardingProps {}

const OnboardingPage: React.FC<OnBoardingProps> = async () => {
  const token = await getToken();

  const user = await currentUser();
  const profile = await db.userProfile.findFirst({
    where: {
      userId: user?.id as string,
    },
  });

  if (profile) {
    redirect(`/${profile.profileUrl}`);
  }

  return (
    <div className="max-w-2xl py-10 h-screen flex flex-col justify-between mx-auto">
      <OnboardHeader />
      <ArtistProfileCard />
      <UserForm token={token.access_token} />
    </div>
  );
};

export default OnboardingPage;
