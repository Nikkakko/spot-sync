"use client";
import * as React from "react";
import SocialCard from "../SocialCard";
import TopTrackCard from "../TopTrackCard";
import { Track } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface MusicProps {
  topTracks: Track[];
}

const Music: React.FC<MusicProps> = ({ topTracks }) => {
  return (
    <Tabs defaultValue="topTracks" className="container max-w-xl mt-6">
      <TabsList className="flex items-center max-w-[400px] mx-auto">
        <TabsTrigger value="topTracks">Top Tracks</TabsTrigger>
        <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
      </TabsList>
      <TabsContent value="topTracks">
        <div className="grid grid-cols-2 gap-4 mt-4">
          {topTracks.map((t, i) => (
            <TopTrackCard key={i} track={t} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="catalogue">
        <p>catalogue</p>
      </TabsContent>
    </Tabs>
  );
};

export default Music;
