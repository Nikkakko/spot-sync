import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./General";
import Theme from "./Theme";
import Music from "./Music";
import Links from "./Links";
import { Shell } from "../layouts/Shell";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";

interface TabValue {
  id: number;
  value: string;
}

const tabValues: TabValue[] = [
  {
    id: 1,
    value: "General",
  },
  {
    id: 2,
    value: "Theme",
  },
  {
    id: 3,
    value: "Music",
  },
  {
    id: 4,
    value: "Links",
  },
];

interface TabsSectionProps {}

const TabsSection: React.FC<TabsSectionProps> = async ({}) => {
  const user = await currentUser();
  const profile = await db.userProfile.findFirst({
    where: {
      userId: user?.id as string,
    },
  });

  return (
    <Shell className="flex">
      <Tabs
        defaultValue={tabValues[0].value.toLowerCase()}
        className="container max-w-xl mt-6"
      >
        <TabsList className="grid w-full grid-cols-4 max-w-[400px] mx-auto">
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
              className="w-full mx-auto px-4 mt-12"
            >
              {tab.value === "General" && (
                <General
                  bio={profile?.bio as string}
                  name={profile?.name as string}
                  profileUrl={profile?.profileUrl as string}
                  image={profile?.image as string}
                  coverImage={profile?.coverImage as string}
                />
              )}
              {tab.value === "Theme" && (
                <Theme
                  image={profile?.image as string}
                  name={profile?.name as string}
                />
              )}
              {tab.value === "Music" && <Music />}
              {tab.value === "Links" && <Links />}
            </TabsContent>
          );
        })}
      </Tabs>
    </Shell>
  );
};

export default TabsSection;
