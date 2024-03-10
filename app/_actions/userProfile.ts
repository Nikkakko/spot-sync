"use server";
import db from "@/lib/db";
import {
  CreateProfile as CreateProfileSchema,
  UpdateFormSchema,
  createProfile as createProfileTypes,
  updateFormSchema,
} from "@/lib/validation";
import { currentUser } from "@clerk/nextjs";
import { getArtistAlbums, getArtistBio } from "@/lib/spotify";
import { cleanText, stringToSlug } from "@/lib/utils";
import { artisAlbumType } from "@/types";
import { checkSubscription } from "@/lib/subscription";

export async function createProfileAction(values: CreateProfileSchema) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const [artistBio] = await Promise.all([getArtistBio(values.name)]);

  if (!user) {
    throw new Error("User not found");
  }
  /* safe pares */
  const parsedValues = createProfileTypes.safeParse(values);

  const userExists = await db.userProfile.findFirst({
    where: {
      name: values.name,
    },
  });

  if (userExists) {
    throw new Error("profile already exists");
  }

  try {
    if (parsedValues.success) {
      await db.userProfile.create({
        data: {
          userId: user.id,
          coverImage: null,
          profileUrl: stringToSlug(parsedValues.data.profileUrl),
          artistId: parsedValues.data.artistId,
          name: parsedValues.data.name,
          image: parsedValues.data.image,
          spotifyUrl: parsedValues.data.spotifyUrl,
          bio: cleanText(
            artistBio.artist.bio.content || artistBio.artist.bio.summary
          ),
          socials: {
            create: {
              name: "Spotify",
              url: parsedValues.data.spotifyUrl,
              icon: "spotify",
              userId: user.id,
            },
          },

          theme: {
            create: {
              userId: user.id,
            },
          },
        },
      });

      return {
        success: true,
        message: "Profile created successfully",
      };
    }
  } catch (error) {
    console.log(error, ["createProfileAction error"]);
    return {
      success: false,
      message: "Failed to create profile",
    };
  }
}

export async function updateProfileAction({
  values,
  image,
  coverImage,
}: {
  values: UpdateFormSchema;
  image: string;
  coverImage: string;
}) {
  const user = await currentUser();
  const checkSub = await checkSubscription();

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const userExists = await db.userProfile.findFirst({
    where: {
      userId: user.id,
    },
  });

  const userTheme = await db.theme.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!userExists || !userTheme) {
    return {
      success: false,
      message: "Profile not found",
    };
  }

  const parsedValues = updateFormSchema.safeParse(values);

  if (parsedValues.success) {
    if (parsedValues.data.theme.type !== "DEFAULT" && !checkSub) {
      return {
        sub: false,
        message: "You need to be subscribed to change the theme",
      };
    }

    await db.userProfile.update({
      where: {
        userId: user.id,
        id: userExists.id,
      },
      data: {
        name: parsedValues.data.name,
        bio: parsedValues.data.bio,
        image: image,
        coverImage: coverImage,
        theme: {
          update: {
            where: {
              userId: user.id,
              id: userTheme.id,
            },

            data: {
              color: parsedValues.data.theme.color,
              type: parsedValues.data.theme.type,
            },
          },
        },
      },
    });

    return {
      success: true,
      message: "Profile updated successfully",
    };
  }

  return {
    success: false,
    message: "Failed to update profile",
  };
}
