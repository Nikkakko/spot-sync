import Image from "next/image";
import * as React from "react";
import * as dateFns from "date-fns";
import Link from "next/link";
import { artisAlbumType } from "@/types";

interface AlbumCardProps {
  album: artisAlbumType;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Link href={album.external_urls.spotify} target="_blank">
      <div
        className="flex flex-col pt-1 px-1 pb-4 bg-cardBackground bg-transition duration-200 ease-in-out transform hover:scale-105 
        opacity-90 hover:opacity-100 rounded-lg"
      >
        <div className="flex flex-col items-start">
          <Image
            src={album.images[0].url}
            alt={album.name}
            width={200}
            height={200}
            className="rounded-md"
            priority
          />
          <div className="flex flex-col px-1 ">
            <p className="text-sm font-bold mt-2 capitalize text-primaryTextColor">
              {album.name.length > 20
                ? album.name.slice(0, 20) + "..."
                : album.name}
            </p>
            <div className="flex items-center text-secondaryTextColor">
              <p className="text-sm  font-semibold">
                {dateFns.format(album.release_date, "yyyy")}
              </p>
              <span className="mx-1 ">•</span>
              <p className="text-sm  capitalize font-semibold">
                {album.album_type}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
