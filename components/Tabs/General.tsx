"use client";
import * as React from "react";
import Image from "next/image";
import { useUploadThing } from "@/utils/uploadthing";

import { updateProfileAction } from "@/app/_actions/userProfile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFormSchema } from "@/lib/validation";
import * as z from "zod";

import { useRef } from "@/utils/store";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface GeneralProps {
  name: string | null;
  bio: string | null;
  profileUrl: string | null;
  image: string | null;
  coverImage: string | null;
  userTheme: string | null;
}

const General: React.FC<GeneralProps> = ({
  bio,
  profileUrl,
  image,
  name,
  coverImage,
  userTheme,
}) => {
  const { ref, setIsSubmitting } = useRef();

  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [coverPreview, setCoverPreview] = React.useState<string | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(image);
  const [coverUrl, setCoverUrl] = React.useState<string | null>(coverImage);
  const { theme, setTheme } = useTheme();

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: name || "",
      bio: bio || "",
    },
  });

  const handleOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isImage: boolean
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Do something with files
    if (isImage) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setCoverPreview(URL.createObjectURL(file));
    }

    // Then start the upload
    const data = await startUpload([file]);
    if (data) {
      if (isImage) {
        setImageUrl(data[0].url);
      } else {
        setCoverUrl(data[0].url);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    const hasChanges =
      values.name !== name ||
      values.bio !== bio ||
      imageUrl !== image ||
      coverUrl !== coverImage ||
      theme !== userTheme;

    if (!hasChanges) return;

    setIsSubmitting(true);

    try {
      const data = await updateProfileAction(
        values,
        imageUrl,
        coverUrl,
        theme as string
      );

      if (data?.success) {
        toast({
          title: "Profile updated successfully",
          description: "Your profile has been updated successfully",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <div className="block relative border border-black border-opacity-50 rounded-lg overflow-hidden p-[1px]">
            <div
              className={cn(
                "relative w-[340px] h-[120px] rounded-lg overflow-hidden",
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
            ref={ref} // This is the ref we are using to submit the form
          >
            <FormField
              control={form.control}
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
              control={form.control}
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default General;
