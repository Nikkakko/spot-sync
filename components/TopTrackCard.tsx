"use client";
import { Track } from "@/types";
import Image from "next/image";
import * as React from "react";
import { Icons } from "./icons";
import * as dateFns from "date-fns";
import { cn } from "@/lib/utils";

interface TopTrackCardProps {
  track: Track;
}

const TopTrackCard: React.FC<TopTrackCardProps> = ({ track }) => {
  const audiRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const playAudio = () => {
    if (isPlaying) {
      audiRef.current?.pause();
      setIsPlaying(false);
    } else {
      audiRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className=" flex flex-col  group" onClick={playAudio}>
      <div
        className="flex flex-col justify-center pt-1 px-1 pb-4 bg-cardBackground bg-transition duration-200 ease-in-out transform hover:scale-105 
        opacity-90 hover:opacity-100 rounded-lg"
      >
        <Image
          src={track.album.images[0].url}
          alt={track.name}
          width={200}
          height={200}
          className="rounded-md"
        />

        <div className="flex flex-col px-1 ">
          <p className="text-sm font-bold mt-2 capitalize text-primaryTextColor">
            {track.name}
          </p>
          <div className="flex items-center text-secondaryTextColor">
            <p className="text-sm font-semibold">
              {dateFns.format(track.album.release_date, "yyyy")}
            </p>
            <span className="mx-1">•</span>
            <p className="text-sm capitalize font-semibold">
              {track.album.name}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ease-in-out hover:cursor-pointer z-10  absolute w-16 h-16 flex items-center justify-center rounded-full bg-white/50 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ",
            isPlaying ? "opacity-100 scale-100" : "opacity-0"
          )}
        >
          {isPlaying ? (
            <Icons.pauseButton
              className="w-6 h-6
             transition-all duration-200 ease-in-out
           "
            />
          ) : (
            <Icons.playButton
              className="w-6 h-6
            transition-all duration-200 ease-in-out
        "
            />
          )}
        </div>
      </div>
      <audio className="hidden" src={track.preview_url} ref={audiRef} />
    </div>
  );
};

export default TopTrackCard;
