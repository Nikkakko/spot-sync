import {
  getArtistAlbums,
  getArtistBio,
  getArtistTopTracks,
  getToken,
} from "@/lib/spotify";
import * as React from "react";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AlbumCard from "@/components/AlbumCard";
import { Icons } from "@/components/icons";
import CommandBar from "@/components/CommandBar";
import SocialCard from "@/components/SocialCard";
import { truncate } from "@/utils";
import GeneralTabs from "@/components/Tabs/GeneralTabs";

interface PageProps {
  params: {
    slug: string;
  };
}

async function ProfilePage({ params: { slug } }: PageProps) {
  const user = await currentUser();
  const token = await getToken();

  const profile = await db.userProfile.findFirst({
    where: {
      profileUrl: slug,
      userId: user?.id,
    },

    include: {
      albums: true,
      socials: true,
    },
  });

  const topTracks = await getArtistTopTracks(
    profile?.artistId as string,
    token.access_token as string
  );

  /* testing */
  if (!profile) {
    return notFound();
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full pb-20">
      <div className="mt-32 p-1 shadow-md rounded-xl items-start w-full bg-white">
        <div className="flex items-center ">
          <div className="relative w-52 h-52 rounded-lg overflow-hidden">
            <Image
              src={profile?.image as string}
              alt={profile?.name as string}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={100}
              className=""
            />
          </div>
          <div className="flex flex-col flex-1 px-4">
            <div>
              <h1 className="text-2xl font-bold">{profile?.name}</h1>
              <Link
                href={profile?.spotifyUrl as string}
                target="_blank"
                className="text-sm text-gray-600 font-semibold "
              >
                View on Spotify
              </Link>
            </div>

            <div className="mt-2">
              {/* seperate bio content with new line */}
              <p className="text-gray-600 font-light">
                {truncate(profile?.bio as string, 200)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <React.Suspense fallback={<div>Loading...</div>}>
        <GeneralTabs album={profile?.albums} topTracks={topTracks} />
      </React.Suspense>

      {profile?.socials?.length! > 0 &&
        profile?.socials.map(social => (
          <React.Suspense fallback={<div>Loading...</div>} key={social.id}>
            <div className="mt-6 w-full">
              <SocialCard social={social} />
            </div>
          </React.Suspense>
        ))}

      {user?.id === profile?.userId && <CommandBar />}
    </div>
  );
}

export default ProfilePage;
