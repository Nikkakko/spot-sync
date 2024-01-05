"use client";
import { Track } from "@/types";
import Image from "next/image";
import * as React from "react";
import { Icons } from "./icons";

interface TopTrackCardProps {
  track: Track;
}

const TopTrackCard: React.FC<TopTrackCardProps> = ({ track }) => {
  const audiRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div
      className="relative w-full border border-black/50 rounded-lg shadow-sm flex items-center space-x-4 p-1
        hover:bg-black/10 transition-all duration-200 ease-in-out cursor-pointer
      "
      onClick={() => {
        if (isPlaying) {
          audiRef.current?.pause();
          setIsPlaying(false);
        } else {
          audiRef.current?.play();
          setIsPlaying(true);
        }
      }}
    >
      <div
        className="relative w-20 h-20 rounded-md overflow-hidden
        cursor-pointer"
      >
        <Image src={track.album.images[0].url} fill alt="trackPoster" />
      </div>
      <div className="flex flex-col flex-1 ml-auto">
        <h3>{track.name}</h3>
        <p className="text-sm text-gray-400">{track.album.name}</p>
      </div>

      <audio className="hidden" src={track.preview_url} ref={audiRef} />

      <div
        className="about w-10 h-10 flex items-center justify-center rounded-full bg-white/50
        
      "
      >
        {isPlaying ? (
          <Icons.pauseButton
            className="w-4 h-4
            transition-all duration-200 ease-in-out
          "
          />
        ) : (
          <Icons.playButton
            className="w-4 h-4 
            transition-all duration-200 ease-in-out
          "
          />
        )}
      </div>
    </div>
  );
};

export default TopTrackCard;
