import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./General";
import Links from "./Links";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";
import { getArtistTopTracks, getToken } from "@/lib/spotify";
import { tabValues } from "@/app/helpers/siteData";
import TabsContainer from "./TabsContainer";
import Nossr from "../nossr";

interface TabsSectionProps {}

const TabsSection: React.FC<TabsSectionProps> = async ({}) => {
  const user = await currentUser();

  const profile = await db.userProfile.findFirst({
    where: {
      userId: user?.id as string,
    },
    include: {
      theme: true,
    },
  });

  if (!profile) return null;

  return (
    <Tabs
      defaultValue={tabValues[0].value.toLowerCase()}
      className="max-w-lg w-full mx-auto py-10"
    >
      <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto ">
        {tabValues.map(tab => (
          <TabsTrigger key={tab.id} value={tab.value.toLowerCase()}>
            {tab.value}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabValues.map(tab => {
        return (
          <TabsContent
            key={tab.id}
            value={tab.value.toLowerCase()}
            className="w-full mx-auto  mt-12"
          >
            <TabsContainer
              tab={tab.value}
              profile={{
                bio: profile?.bio,
                name: profile?.name,
                profileUrl: profile?.profileUrl,
                image: profile?.image,
                coverImage: profile?.coverImage,
                theme: profile?.theme,
              }}
            />
            {tab.value === "Links" && <Links />}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default TabsSection;
