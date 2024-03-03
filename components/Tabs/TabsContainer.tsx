"use client";
import * as React from "react";
import General from "./General";
import Themes from "./Themes";
import { useTheme } from "next-themes";
import { useRef } from "@/utils/store";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { updateFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfileAction } from "@/app/_actions/userProfile";
import { useToast } from "../ui/use-toast";
import { useUploadThing } from "@/utils/uploadthing";

interface TabsContainerProps {
  tab: string;
  profile: {
    bio: string;
    name: string;
    profileUrl: string;
    image: string;
    coverImage: string;
    theme: string;
  };
}

const TabsContainer: React.FC<TabsContainerProps> = ({ tab, profile }) => {
  const { theme } = useTheme();
  const { ref, setIsSubmitting, setIsChanged } = useRef();
  const { toast } = useToast();

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [coverPreview, setCoverPreview] = React.useState<string | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(profile.image);
  const [coverUrl, setCoverUrl] = React.useState<string | null>(
    profile.coverImage
  );

  const { startUpload, isUploading } = useUploadThing("imageUploader");

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

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: profile.name || "",
      bio: profile.bio || "",
      color: profile.theme || "",
    },
  });

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    const hasChanges =
      form.formState.isDirty ||
      imageUrl !== profile.image ||
      coverUrl !== profile.coverImage;

    if (!hasChanges) return;

    try {
      setIsSubmitting(true);
      const data = await updateProfileAction({
        values: values,
        image: imageUrl as string,
        coverImage: coverUrl as string,
      });

      if (data?.success) {
        toast({
          title: "Profile updated successfully",
          description: "Your profile has been updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update profile",
        description: "An error occurred while updating your profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsChanged(false);
      form.reset();
    }
  }

  React.useEffect(() => {
    const hasChanges =
      form.formState.isDirty ||
      imageUrl !== profile.image ||
      coverUrl !== profile.coverImage;

    if (hasChanges) {
      setIsChanged(true);
    }

    return () => {
      setIsChanged(false);
    };
  }, [
    form.formState.isDirty,
    isUploading,
    imageUrl,
    profile.image,
    coverUrl,
    profile.coverImage,
    setIsChanged,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
        ref={ref}
      >
        {tab === "General" && (
          <General
            bio={profile?.bio as string}
            name={profile?.name as string}
            profileUrl={profile?.profileUrl as string}
            image={profile?.image as string}
            coverImage={profile?.coverImage as string}
            currentTheme={theme}
            coverPreview={coverPreview}
            isUploading={isUploading}
            imagePreview={imagePreview}
            handleOnChange={handleOnChange}
          />
        )}

        {tab === "Themes" && (
          <Themes
            image={profile?.image as string}
            name={profile?.name as string}
          />
        )}
      </form>
    </Form>
  );
};

export default TabsContainer;