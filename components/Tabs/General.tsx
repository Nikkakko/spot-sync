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
import { useRef } from "@/utils/store";

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
    <div className="flex flex-col w-full pb-20">
      <div className="flex items-start flex-col md:flex-row md:items-center gap-4">
        <ImageUpload
          label="Avatar"
          imagePreview={imagePreview}
          image={image}
          handleOnChange={handleOnChange}
          isUploading={isUploading}
          isAvatar={true}
        />
        <ImageUpload
          label="Cover"
          imagePreview={coverPreview}
          image={coverImage}
          handleOnChange={handleOnChange}
          isUploading={isUploading}
          isAvatar={false}
        />
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

type ImageUploadProps = {
  label: string;
  imagePreview: string | null;
  image: string | null;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    isAvatar: boolean
  ) => void;
  isUploading: boolean;
  isAvatar: boolean;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  imagePreview,
  image,
  handleOnChange,
  isUploading,
  isAvatar,
}) => {
  const width = isAvatar ? "120px" : "340px";
  const height = "120px";
  const placeholderText = isAvatar ? "upload image" : "add cover image";
  const { setIsChanged } = useRef();

  return (
    <div className="flex flex-col">
      <span className="mb-2 text-muted-foreground">{label}</span>
      <div className="relative block border border-black border-opacity-50 rounded-lg p-[1px]">
        <div
          className={cn(
            `relative  rounded-lg overflow-hidden group hover:opacity-50 transition-opacity duration-200 ease-in-out`,
            isUploading && "opacity-50"
          )}
          style={{
            width,
            height,
          }}
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt={`${label} image`}
              fill
              className="object-cover"
            />
          ) : image ? (
            <Image
              src={image}
              alt={`${label} image`}
              fill
              className="object-cover"
              quality={100}
              sizes={width}
            />
          ) : (
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground capitalize font-semibold">
              {placeholderText}
            </p>
          )}

          <input
            type="file"
            name="files"
            onChange={e => {
              handleOnChange(e, isAvatar);
              setIsChanged(true);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
};
