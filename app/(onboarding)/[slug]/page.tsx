import { getArtistAlbums, getArtistTopTracks, getToken } from "@/lib/spotify";
import * as React from "react";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import CommandBar from "@/components/CommandBar";
import SocialCard from "@/components/SocialCard";
import GeneralTabs from "@/components/Tabs/GeneralTabs";
import AlbumLoader from "@/components/Loaders/AlbumLoader";
import UserProfileInfo from "@/components/UserProfileInfo";
import type { Metadata, ResolvingMetadata } from "next";
import Nossr from "@/components/nossr";
import SocialCardLoader from "@/components/Loaders/SocialCardLoader";

interface PageProps {
  params: {
    slug: string;
  };
}
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // get user profile
  const profile = await db.userProfile.findFirst({
    where: {
      profileUrl: slug,
    },
  });

  // if profile not found return 404

  if (!profile) {
    return {
      title: "Not Found",
      description: "Profile not found",
    };
  }

  // return metadata
  return {
    title: profile.name,
    description: profile.bio,
    keywords: profile.name,
  };
}
async function ProfilePage({ params: { slug } }: PageProps) {
  const [user, token, profile] = await Promise.all([
    currentUser(),
    getToken(),
    db.userProfile.findFirst({
      where: {
        profileUrl: slug,
      },
      include: {
        socials: true,
        theme: true,
      },
    }),
  ]);

  const [topTracks, getAlbums] = await Promise.all([
    getArtistTopTracks(
      profile?.artistId as string,
      token.access_token as string
    ),
    getArtistAlbums(profile?.artistId as string, token.access_token as string),
  ]);

  if (!profile) {
    return notFound();
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full pb-20 max-w-3xl mx-auto px-1 font-clash">
      {/* add cover image to bg */}

      <UserProfileInfo
        profile={{
          name: profile?.name as string,
          image: profile?.image as string,
          spotifyUrl: profile?.spotifyUrl as string,
          bio: profile?.bio as string,
          theme: profile?.theme,
          coverImage: profile?.coverImage as string,
        }}
      />

      <React.Suspense fallback={<AlbumLoader />}>
        <GeneralTabs album={getAlbums?.items} topTracks={topTracks} />
        {(getAlbums?.items?.length ?? 0) === 0 && <AlbumLoader />}
      </React.Suspense>

      <section className="w-full grid grid-cols-1 gap-2 pt-8 ">
        {profile?.socials?.length > 0 &&
          profile?.socials.map(social => (
            <SocialCard social={social} key={social.id} />
          ))}
      </section>

      {user?.id === profile?.userId && <CommandBar />}

      {/* add copyright */}
      <div className=" p-4 text-center text-primarybg">
        <p>
          &copy; {new Date().getFullYear()} - {profile?.name}
          <br />
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
