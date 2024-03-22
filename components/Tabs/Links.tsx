import * as React from "react";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import SocialCard from "../SocialCard";
import SocialLinkSetup from "../SocialLinkSetup";

interface LinksProps {}

const Links: React.FC<LinksProps> = async ({}) => {
  const user = await currentUser();

  const profile = await db.userProfile.findFirst({
    where: {
      userId: user?.id as string,
    },

    include: {
      socials: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col space-y-4  ">
      <SocialLinkSetup />
      {profile?.socials?.map(social => (
        <SocialCard key={social.id} social={social} basicLink />
      ))}
    </div>
  );
};

export default Links;
