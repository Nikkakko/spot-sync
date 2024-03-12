"use client";
import { cn } from "@/lib/utils";
import { useThemeChoose } from "@/store/themeStore";
import { truncate } from "@/utils";
import { Theme } from "@prisma/client";
import { useTheme } from "next-themes";
import Image from "next/image";

import * as React from "react";

import UserProfileLoader from "./Loaders/UserProfileLoader";
import { apiResponseText } from "@/app/helpers/siteData";

interface UserProfileProps {
  name: string;
  image: string;
  coverImage: string;
  spotifyUrl: string;
  bio: string;
  theme: Theme | null;
}

interface UserProfileInfoProps {
  profile: UserProfileProps;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ profile }) => {
  const { setTheme, theme } = useTheme();
  const { selectedTheme, setSelectedTheme } = useThemeChoose();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (profile.theme) {
      setSelectedTheme({
        color: profile.theme.color,
        type: profile.theme.type,
      });
      setTheme(profile.theme.color.toLowerCase());
    }

    return () => {
      setSelectedTheme({ color: "DEFAULT", type: "DEFAULT" });
      setTheme("default");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.theme]);

  const currentType = selectedTheme.type;

  React.useEffect(() => {
    //set loading to true after 1s
    if (profile) setIsLoading(false);

    //clean up
    return () => {
      setIsLoading(true);
    };
  }, [profile]);

  if (isLoading) return <UserProfileLoader />;

  return (
    <div
      className={cn(
        "relative mt-14 p-1 overflow-hidden rounded-xl items-start w-full  z-10",
        currentType === "DEFAULT" && "bg-cardBackground",
        currentType === "POP" && "bg-white"
      )}
    >
      <div
        className={cn(
          "flex items-start flex-col",
          currentType === "DEFAULT" && "lg:flex-row",
          currentType === "POP" && "flex-col items-center"
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden z-20",
            currentType === "POP" &&
              "rounded-full  w-36 h-36 mt-4 ring-4 ring-white",
            currentType === "DEFAULT" && "rounded-lg lg:w-52 h-[350px] lg:h-52 "
          )}
        >
          <Image
            src={profile?.image as string}
            alt={profile?.name as string}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col flex-1 lg:px-4 z-20">
          <h1
            className={cn(
              "text-2xl font-bold ",
              currentType !== "DEFAULT"
                ? "text-primary"
                : "text-primaryTextColor"
            )}
          >
            {profile?.name}
          </h1>

          <div className="py-2">
            {/* seperate bio content with new line */}
            <p
              className={cn(
                "font-light font-mono text-sm",
                currentType !== "DEFAULT" && profile?.coverImage
                  ? "text-white/80"
                  : "text-secondaryTextColor"
              )}
            >
              {/* remove apiResponseText from bio */}
              {profile?.bio?.includes(apiResponseText) &&
                profile?.bio?.replace(apiResponseText, "")}
            </p>
          </div>
        </div>
      </div>

      {/* add cover image to bg */}
      {profile?.coverImage && selectedTheme.type !== "DEFAULT" && (
        <div className="absolute inset-0 w-full h-full bg-black z-0 filter blur-sm">
          <div className="relative h-full w-full">
            <Image
              src={profile?.coverImage}
              alt={profile?.name}
              fill
              className="object-cover opacity-75"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileInfo;
