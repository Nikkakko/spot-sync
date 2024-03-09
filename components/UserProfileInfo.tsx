"use client";
import { cn } from "@/lib/utils";
import { useThemeChoose } from "@/store/themeStore";
import { truncate } from "@/utils";
import { Theme } from "@prisma/client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Skeleton } from "./ui/skeleton";
import UserProfileLoader from "./Loaders/UserProfileLoader";

interface UserProfileProps {
  name: string;
  image: string;
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

  // React.useEffect(() => {
  //   if (profile?.theme?.type === "DEFAULT") {
  //     setSelectedTheme({ color: "DEFAULT", type: "DEFAULT" });
  //     setTheme(profile.theme.color.toLowerCase());
  //   } else {
  //     if (!profile?.theme) return;
  //     setSelectedTheme({
  //       color: profile.theme.color,
  //       type: profile.theme.type,
  //     });
  //     setTheme(profile.theme.color.toLowerCase());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [profile?.theme]);

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
        "mt-14 p-1 shadow-md rounded-xl items-start w-full  z-10",
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
            "relative w-full overflow-hidden",
            currentType === "POP" && "rounded-full  w-32 h-32 mt-4 shadow-md",
            currentType === "DEFAULT" && "rounded-lg lg:w-52 h-[350px] lg:h-52"
          )}
        >
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

          <div className="py-2">
            {/* seperate bio content with new line */}
            <p className="text-secondaryTextColor font-light">
              {truncate(profile?.bio as string, 200)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
