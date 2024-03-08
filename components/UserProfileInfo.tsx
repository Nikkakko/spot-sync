"use client";
import { cn } from "@/lib/utils";
import { useThemeChoose } from "@/store/themeStore";
import { truncate } from "@/utils";
import { Theme } from "@prisma/client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

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

  // React.useEffect(() => {
  //   if (profile?.theme?.type === "DEFAULT") {
  //     setSelectedTheme({ color: "DEFAULT", type: "DEFAULT" });
  //     setTheme(profile.theme.color);
  //   } else {
  //     if (!profile?.theme) return;
  //     setSelectedTheme({
  //       color: profile.theme.color,
  //       type: profile.theme.type,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [profile?.theme]);

  const currentType = selectedTheme.type;

  return (
    <div className="mt-14 p-1 shadow-md rounded-xl items-start w-full bg-cardBackground z-10 ">
      <div className={cn("flex items-start flex-col lg:flex-row")}>
        <div
          className={cn(
            "relative w-full lg:w-52 h-[350px] lg:h-52  overflow-hidden",
            currentType === "POP" && "rounded-full",
            currentType === "DEFAULT" && "rounded-lg"
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
