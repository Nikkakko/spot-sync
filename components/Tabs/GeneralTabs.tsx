"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Track, artisAlbumType } from "@/types";
import AlbumCard from "../AlbumCard";
import TopTrackCard from "../TopTrackCard";
import { Theme } from "@prisma/client";
import { useThemeChoose } from "@/store/themeStore";
import { cn } from "@/lib/utils";

interface GeneralTabsProps {
  album: artisAlbumType[];
  topTracks: { tracks: Track[] };
}

const GeneralTabs: React.FC<GeneralTabsProps> = ({ album, topTracks }) => {
  const { selectedTheme } = useThemeChoose();

  return (
    <Tabs defaultValue="albums" className="w-full mt-6">
      <TabsList
        className={cn(
          selectedTheme.type === "DEFAULT" ? "bg-cardBackground" : ""
        )}
      >
        <TabsTrigger value="albums">Albums</TabsTrigger>
        <TabsTrigger value="top-tracks">Top Tracks</TabsTrigger>
      </TabsList>

      <TabsContent
        value="albums"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-0  "
      >
        {album?.map((a, i) => (
          <AlbumCard album={a} key={i} />
        ))}
      </TabsContent>

      <TabsContent
        value="top-tracks"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-0 mt-0 "
      >
        {topTracks?.tracks?.map((t, i) => (
          <TopTrackCard key={i} track={t} />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default GeneralTabs;
