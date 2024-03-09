import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface PopThemeProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string | null;
  name: string | null;
  coverImage: string | null;
}

const PopTheme: React.FC<PopThemeProps> = forwardRef(
  ({ image, name, coverImage, ...props }, ref) => {
    if (!image || !name) return null;

    const coverClass = cn(
      "absolute inset-0 w-full h-full p-2 object-cover rounded-sm z-0 opacity-50 filter blur-md"
    );

    return (
      <div
        className={cn(
          "bg-white flex flex-col gap-2 w-full p-2 relative font-clash",
          props.className
        )}
        onClick={props.onClick}
      >
        <div className="w-full h-auto rounded-sm flex items-start justify-center p-4 py-8">
          <div className=" flex items-center flex-col gap-2 p-2 rounded-lg w-full z-20">
            <Image
              src={image}
              alt={name}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />

            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-lg text-black">{name}</h4>

              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-2 w-full" />
              ))}
            </div>
          </div>
        </div>

        {/* add cover image as bg */}
        {coverImage ? (
          <Image
            src={coverImage}
            alt={name}
            width={116}
            height={116}
            className={cn(coverClass)}
          />
        ) : (
          <Skeleton className={cn(coverClass)} />
        )}

        {/* add default theme text */}
        <h4 className="text-center text-sm text-secondaryText">Pop Theme</h4>

        <div className="absolute right-2 bottom-2 border border-indigo-600 rounded-md">
          <p className="text-xs text-indigo-600 p-1 font-bold uppercase tracking-wider">
            Pro
          </p>
        </div>
      </div>
    );
  }
);

//display name
PopTheme.displayName = "PopTheme";

export default PopTheme;
