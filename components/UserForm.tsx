"use client";
import * as React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { UserQuery, userQuery } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getArtistInfo } from "@/lib/spotify";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Item, useUserInfoStore } from "@/hooks/user-info";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { createProfileAction } from "@/app/_actions/userProfile";
import { useToast } from "./ui/use-toast";
import { stringToSlug } from "@/lib/utils";

interface UserFormProps {
  token: string;
}

const UserForm: React.FC<UserFormProps> = ({ token }) => {
  const { setArtist, artists, step, setStep, selectedArtist } =
    useUserInfoStore();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const form = useForm<UserQuery>({
    resolver: zodResolver(userQuery),
    defaultValues: {
      artistName: "",
      createProfile: "",
    },
  });

  async function handleDefaultCase(artistName: string, token: string) {
    const artistInfo = await getArtistInfo(artistName, token);

    /* set artistId and token in local storage */

    setArtist(artistInfo.artists);
    setStep("selectArtist");
  }

  const isLoading = form.formState.isSubmitting || isPending;

  async function handleCreateProfileCase(
    values: UserQuery,
    selectedArtist: Item | null,
    token: string
  ) {
    const profileValues = {
      artistId: selectedArtist?.id as string,
      profileUrl: values.createProfile,
      name: selectedArtist?.name as string,
      image: selectedArtist?.images[0].url as string,
      spotifyUrl: selectedArtist?.external_urls.spotify as string,
      token,
    };

    try {
      startTransition(async () => {
        const userProfile = await createProfileAction(profileValues);
        if (userProfile?.success) {
          toast({
            title: "Profile Created",
            description: "Your profile has been created successfully",
          });
          form.reset();
          router.push(`/${stringToSlug(profileValues.profileUrl)}`);
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An error occurred while creating your profile. Please try again.",
      });
    }
  }

  async function onSubmit(values: UserQuery) {
    try {
      switch (step) {
        case "default":
          await handleDefaultCase(values.artistName, token);
          break;
        case "selectArtist":
          setStep("createProfile");
          break;
        case "createProfile":
          await handleCreateProfileCase(values, selectedArtist, token);
          break;
        default:
          throw new Error(`Invalid step: ${step}`);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 relative"
      >
        {step === "default" && (
          <FormField
            control={form.control}
            name="artistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What&apos;s your artist name?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g Kayakata"
                    {...field}
                    className=""
                    autoFocus
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {step === "createProfile" && (
          <FormField
            control={form.control}
            name="createProfile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center ">
                    <span className="absolute z-10 left-6">noise.site/</span>
                    <Input
                      autoFocus
                      {...field}
                      className="absolute left-0 pl-24 w-full "
                      placeholder={selectedArtist?.name
                        .toLowerCase()
                        .replace(/\s/g, "")}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Icons.loader className="w-4 h-4 mr-2 animate-spin" />}

          {step !== "createProfile" ? "Next" : "Create Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
