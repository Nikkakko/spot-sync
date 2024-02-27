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
import { Button } from "../ui/button";
import { FreeIcon, Icons } from "../icons";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

interface CustomUserButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  email: string | undefined;
  userProfileImage: string | undefined;
  userName: string | undefined;
}

const CustomUserButton: React.FC<CustomUserButtonProps> = ({
  email,
  userProfileImage,
  userName,
  ...props
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Icons.user className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader className="flex items-start justify-between  flex-row gap-2 ">
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

          <Button variant="outline" className="max-w-fit " asChild>
            <SignOutButton />
          </Button>
        </DialogHeader>

        <DialogFooter className="flex sm:flex-col space-y-2">
          <FreeIcon />
          <DialogDescription className="text-secondaryText font-semibold">
            {`  You're on the free plan which allows you to create your Spot-Sync for
            free, add and customize your links, show off your music and more.`}
          </DialogDescription>

          <Button variant="default" className="w-full capitalize">
            Go Pro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomUserButton;
