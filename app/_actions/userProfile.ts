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
          socials: {},
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

  if (!userExists) {
    return {
      success: false,
      message: "Profile not found",
    };
  }

  const parsedValues = updateFormSchema.safeParse(values);

  if (parsedValues.success) {
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
        theme: parsedValues.data.color,
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
