import { getArtistAlbums, getArtistBio } from "@/lib/spotify";
import * as React from "react";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AlbumCard from "@/components/AlbumCard";
import { Icons } from "@/components/icons";
import CommandBar from "@/components/CommandBar";

interface PageProps {
  params: {
    slug: string;
  };
}

async function ProfilePage({ params: { slug } }: PageProps) {
  const user = await currentUser();

  const profile = await db.userProfile.findFirst({
    where: {
      profileUrl: slug,
    },

    include: {
      albums: true,
    },
  });

  /* testing */
  if (user && !profile) {
    return redirect("/onboarding");
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full">
      <div className="mt-32 p-8 shadow-md rounded-xl items-start w-full bg-white">
        <div className="flex items-start space-x-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={profile?.image as string}
              alt={profile?.name as string}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={100}
              className=" "
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{profile?.name}</h1>
            <Link
              href={profile?.spotifyUrl as string}
              target="_blank"
              className="text-sm text-gray-600 font-semibold "
            >
              View on Spotify
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold ">Bio</h2>
          {/* seperate bio content with new line */}
          <p className="text-gray-600 font-semibold">
            {profile?.bio?.split("\n").map((text, index) => (
              <span key={index}>
                {text}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-16">
        {profile?.albums.map(album => (
          <React.Suspense fallback={<div>Loading...</div>} key={album.id}>
            <AlbumCard album={album} />
          </React.Suspense>
        ))}
      </div>

      {user?.id === profile?.userId && <CommandBar />}
    </div>
  );
}

export default ProfilePage;
