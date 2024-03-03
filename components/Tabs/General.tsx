"use client";
import * as React from "react";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

interface GeneralProps {
  name: string | null;
  bio: string | null;
  profileUrl: string | null;
  image: string | null;
  coverImage: string | null;
  currentTheme: string | undefined;
  isUploading: boolean;
  imagePreview: string | null;
  coverPreview: string | null;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    isImage: boolean
  ) => void;
}

const General: React.FC<GeneralProps> = ({
  image,
  coverImage,
  coverPreview,
  isUploading,
  imagePreview,
  handleOnChange,
}) => {
  const { control } = useFormContext(); // retrieve all hook methods

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="mb-2 text-muted-foreground">Avatar</span>
          <div className="relative block border border-black border-opacity-50 rounded-lg overflow-hidden p-[1px]">
            <div
              className={cn(
                "relative w-[120px] h-[120px] rounded-lg overflow-hidden group hover:opacity-50 transition-opacity duration-200 ease-in-out",
                isUploading && "opacity-50"
              )}
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="profile image"
                  fill
                  className="object-cover"
                />
              ) : image ? (
                <Image
                  src={image as string}
                  alt="profile image"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="120px"
                />
              ) : (
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground capitalize font-semibold">
                  upload image
                </p>
              )}

              <input
                type="file"
                name="files"
                onChange={e => handleOnChange(e, true)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <span className="mb-2 text-muted-foreground">Cover</span>
          <div
            className="block relative border border-black border-opacity-50 rounded-lg overflow-hidden p-[1px] 
            group
          "
          >
            <div
              className={cn(
                "relative w-[340px] h-[120px] rounded-lg overflow-hidden group hover:opacity-50 transition-opacity duration-200 ease-in-out ",
                isUploading && "opacity-50"
              )}
            >
              {coverPreview ? (
                <Image
                  src={coverPreview}
                  alt="cover image"
                  fill
                  className="object-cover"
                />
              ) : coverImage ? (
                <Image
                  src={coverImage as string}
                  alt="cover image"
                  fill
                  className="object-cover"
                />
              ) : (
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground font-semibold capitalize">
                  add cover image
                </p>
              )}
            </div>

            <input
              type="file"
              name="files"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={e => handleOnChange(e, false)}
              disabled={isUploading}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g Kayakata" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell your musical story with a splash of personality—share the quirks, the inspirations, and the wild ride that brought you to this adventure!"
                  {...field}
                  className="h-60 resize-y"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default General;
