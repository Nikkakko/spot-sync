"use client";
import { truncate } from "@/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface UserProfileInfoProps {
  profile: {
    name: string;
    image: string;
    spotifyUrl: string;
    bio: string;
    theme: string;
  };
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ profile }) => {
  const { setTheme, theme } = useTheme();
  const [isTruncated, setIsTruncated] = React.useState(true);

  React.useEffect(() => {
    if (profile?.theme) setTheme(profile?.theme as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.theme]);

  return (
    <div className="mt-14 p-1 shadow-md rounded-xl items-start w-full bg-cardBackground  ">
      <div className="flex items-start flex-col lg:flex-row">
        <div className="relative w-full lg:w-52 h-[350px] lg:h-52 rounded-lg overflow-hidden">
          <Image
            src={profile?.image as string}
            alt={profile?.name as string}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
            className="object-cover object-top "
          />
        </div>
        <div className="flex flex-col flex-1 lg:px-4">
          <h1 className="text-2xl font-bold text-primaryTextColor">
            {profile?.name}
          </h1>
          <Link
            href={profile?.spotifyUrl as string}
            target="_blank"
            className="text-sm text-secondaryTextColor font-semibold "
          >
            View on Spotify
          </Link>

          <div className="py-2">
            {/* seperate bio content with new line */}
            <p
              className="text-secondaryTextColor font-light"
              onClick={() => setIsTruncated(prev => !prev)}
            >
              {truncate(profile?.bio as string, 200)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
