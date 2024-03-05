"use client";
import { Social } from "@prisma/client";
import * as React from "react";
import { Icons } from "./icons";
import Link from "next/link";
import { deleteLinksAction } from "@/app/_actions/links";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface SocialCardProps extends React.HTMLProps<HTMLDivElement> {
  social: Social;
  basicLink?: boolean;
}

const SocialCard: React.FC<SocialCardProps> = ({
  social,
  basicLink,
  ...props
}) => {
  const Icon = Icons[social.icon.toLowerCase()];
  const [isPending, startTransition] = React.useTransition();
  const pathname = usePathname();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    startTransition(async () => {
      await deleteLinksAction(social.id);
    });
  };

  return (
    <Link
      href={
        social.url.startsWith("http") ? social.url : `https://${social.url}`
      }
      target="_blank"
    >
      <div
        className={cn(
          " font-clash border border-neutral-800/20 rounded-lg p-2 flex items-center space-x-4 shadow-md group  duration-200 transition-all ease-in-out cursor-pointer hover:scale-105 transform ",
          isPending && "opacity-50",
          basicLink ? "bg-white/30" : "bg-cardBackground",
          props.className
        )}
      >
        <div className="bg-linkIconBackgroundColor w-[48px] h-[48px] flex items-center justify-center rounded-lg">
          <Icon className="fill-linkIconFillColor" />
        </div>
        <div className="flex flex-col flex-1">
          <span
            className={cn(
              "capitalize",
              basicLink ? "text-black" : "text-primaryTextColor"
            )}
          >
            {social.name}
          </span>
          <span
            className={cn(
              "text-sm  max-w-fit font-mono",
              basicLink ? "text-black" : "text-primaryTextColor"
            )}
          >
            {social.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
          </span>
        </div>
        <div
          className={cn(
            "opacity-0 group-hover:opacity-100 hover:scale-105  transition-opacity duration-200 cursor-pointer z-20",
            pathname === "/customize" ? "block" : "hidden"
          )}
          role="button"
          aria-label="Remove social"
          onClick={handleDelete}
        >
          <Icons.x className="w-6 h-6" />
        </div>
      </div>
    </Link>
  );
};

export default SocialCard;
