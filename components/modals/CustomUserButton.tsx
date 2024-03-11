"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { FreeIcon, Icons, ProIcon } from "../icons";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useModalStore } from "./ModalStore";

interface CustomUserButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  email: string | undefined;
  userProfileImage: string | undefined;
  userName: string | undefined;
  profileUrl: string | undefined;
  isPro: boolean | undefined;
  subEnd: Date | undefined | null;
}

const CustomUserButton: React.FC<CustomUserButtonProps> = ({
  email,
  userProfileImage,
  userName,
  profileUrl,
  isPro,
  subEnd,
}) => {
  const { onOpen } = useModalStore();

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button variant="default">
          <Icons.user className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]   px-1 md:px-6">
        <DialogHeader className="flex items-start justify-between flex-row gap-2 ">
          <div className="flex items-start justify-center gap-2">
            {userProfileImage ? (
              <Image
                src={userProfileImage}
                alt="User profile image"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <Icons.user className="w-10 h-10" />
            )}

            <div className="flex flex-col space-y-1">
              <DialogTitle className="text-sm font-bold text-secondaryText">
                {email}
              </DialogTitle>
              <DialogDescription className="text-xs text-secondaryText text-start ">
                {userName}
              </DialogDescription>
            </div>
          </div>

          <Button variant="outline" className="max-w-fit  " asChild>
            <SignOutButton />
          </Button>
        </DialogHeader>

        <DialogFooter className="flex space-y-2">
          <div className="w-full flex items-center justify-between">
            {isPro ? <ProIcon /> : <FreeIcon />}
            {subEnd && (
              <DialogDescription className="text-secondaryText font-semibold md:m-0">
                {`${format(new Date(subEnd), "dd/MM/yyyy")}`}
              </DialogDescription>
            )}
          </div>

          <DialogDescription className="text-secondaryText font-semibold md:m-0">
            {isPro
              ? `You're on the Pro plan which allows you to select any Theme,
            add and customize your links, show off your music and more.`
              : `You're on the free plan which allows you to create your Spot-Sync for
              free, add and customize your links, show off your music and more.`}
          </DialogDescription>

          <Button
            variant="default"
            className="w-full capitalize"
            onClick={() => {
              isPro ? onOpen("cancel-sub") : onOpen("subscription");
            }}
          >
            {isPro ? "Cancel Subscription" : "Go Pro"}
          </Button>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "md:hidden")}
            href={profileUrl || "/onboarding"}
          >
            View Profile
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomUserButton;
