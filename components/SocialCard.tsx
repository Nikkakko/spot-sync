"use client";
import { Social } from "@prisma/client";
import * as React from "react";
import { Icons } from "./icons";
import Link from "next/link";
import { deleteLinksAction } from "@/app/_actions/links";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SocialCardProps extends React.HTMLProps<HTMLDivElement> {
  social: Social;
}

const SocialCard: React.FC<SocialCardProps> = ({ social, ...props }) => {
  const Icon = Icons[social.icon.toLowerCase()];
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    startTransition(async () => {
      await deleteLinksAction(social.id);
    });
  };

  return (
    <div
      className={cn(
        " border border-neutral-800/20 rounded-lg p-2 flex items-center space-x-4 shadow-md group  duration-200 transition-all ease-in-out cursor-pointer hover:scale-105 transform bg-cardBackground ",
        isPending && "opacity-50",
        props.className
      )}
    >
      <div className="bg-linkIconBackgroundColor w-[48px] h-[48px] flex items-center justify-center rounded-lg">
        <Icon className="fill-linkIconFillColor" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="capitalize text-primaryText">{social.name}</span>
        <Link
          href={
            social.url.startsWith("http") ? social.url : `https://${social.url}`
          }
          className="text-sm text-secondaryTextColor hover:text-neutral-600 max-w-fit"
          target="_blank"
        >
          {social.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
        </Link>
      </div>
      <div
        className={cn(
          "opacity-0 group-hover:opacity-100 hover:scale-105  transition-opacity duration-200 cursor-pointer z-20"
        )}
        role="button"
        aria-label="Remove social"
        onClick={handleDelete}
      >
        <Icons.x className="w-6 h-6" />
      </div>
    </div>
  );
};

export default SocialCard;
