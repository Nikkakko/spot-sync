"use client";
import { Album } from "@prisma/client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Track } from "@/types";
import AlbumCard from "../AlbumCard";
import TopTrackCard from "../TopTrackCard";

interface GeneralTabsProps {
  album: Album[];
  topTracks: { tracks: Track[] };
}

const GeneralTabs: React.FC<GeneralTabsProps> = ({ album, topTracks }) => {
  return (
    <Tabs defaultValue="albums" className="w-full mt-6">
      <TabsList className="">
        <TabsTrigger value="albums">Albums</TabsTrigger>
        <TabsTrigger value="top-tracks">Top Tracks</TabsTrigger>
      </TabsList>

      <TabsContent value="albums" className="grid grid-cols-4 gap-4 mt-4">
        {album.map((a, i) => (
          <AlbumCard album={a} key={a.id} />
        ))}
      </TabsContent>
      <TabsContent value="top-tracks" className="grid grid-cols-4 gap-4 mt-4">
        {topTracks.tracks.map((t, i) => (
          <TopTrackCard key={i} track={t} />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default GeneralTabs;
