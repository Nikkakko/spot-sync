import {
  getArtistAlbums,
  getArtistBio,
  getArtistTopTracks,
  getToken,
} from "@/lib/spotify";
import * as React from "react";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

import { notFound, redirect } from "next/navigation";

import CommandBar from "@/components/CommandBar";
import SocialCard from "@/components/SocialCard";

import GeneralTabs from "@/components/Tabs/GeneralTabs";

import AlbumLoader from "@/components/Loaders/AlbumLoader";
import UserProfileInfo from "@/components/UserProfileInfo";

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
    },
    include: {
      socials: true,
    },
  });

  const [topTracks, getAlbums] = await Promise.all([
    getArtistTopTracks(
      profile?.artistId as string,
      token.access_token as string
    ),
    getArtistAlbums(profile?.artistId as string, token.access_token as string),
  ]);

  /* testing */
  if (!profile) {
    return notFound();
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full pb-20 max-w-3xl mx-auto  ">
      {/* add cover image to bg */}

      <UserProfileInfo
        profile={{
          name: profile?.name as string,
          image: profile?.image as string,
          spotifyUrl: profile?.spotifyUrl as string,
          bio: profile?.bio as string,
          theme: profile?.theme as string,
        }}
      />

      <React.Suspense fallback={<AlbumLoader />}>
        <GeneralTabs album={getAlbums?.items} topTracks={topTracks} />
        {(getAlbums?.items?.length ?? 0) === 0 && <AlbumLoader />}
      </React.Suspense>

      {profile?.socials?.length! > 0 &&
        profile?.socials.map(social => (
          <React.Suspense fallback={<div>Loading...</div>} key={social.id}>
            <section className="mt-4 w-full">
              <SocialCard social={social} />
            </section>
          </React.Suspense>
        ))}

      {user?.id === profile?.userId && <CommandBar />}
    </div>
  );
}

export default ProfilePage;
