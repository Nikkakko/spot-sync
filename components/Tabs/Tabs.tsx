import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./General";
import Links from "./Links";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";
import { getArtistTopTracks, getToken } from "@/lib/spotify";
import { tabValues } from "@/app/helpers/siteData";
import TabsContainer from "./TabsContainer";

interface TabsSectionProps {}

const TabsSection: React.FC<TabsSectionProps> = async ({}) => {
  const user = await currentUser();
  const token = await getToken();
  const profile = await db.userProfile.findFirst({
    where: {
      userId: user?.id as string,
    },
  });

  return (
    <Tabs
      defaultValue={tabValues[0].value.toLowerCase()}
      className="max-w-xl w-full mx-auto"
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
                bio: profile?.bio as string,
                name: profile?.name as string,
                profileUrl: profile?.profileUrl as string,
                image: profile?.image as string,
                coverImage: profile?.coverImage as string,
                theme: profile?.theme as string,
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
