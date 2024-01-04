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

type artisAlbumType = {
  name: string;
  images: [
    {
      url: string;
    }
  ];
  release_date: string;
  external_urls: {
    spotify: string;
  };
  album_type: string;
};

export async function createProfileAction(values: CreateProfileSchema) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const artistBio = await getArtistBio(values.name);
  const artistAlbums = await getArtistAlbums(values.artistId, values.token);

  const profileAlbums = artistAlbums?.items?.map((album: artisAlbumType) => {
    return {
      name: album.name,
      image: album.images[0].url,
      releaseDate: album.release_date,
      spotifyUrl: album.external_urls.spotify,
      albumType: album.album_type,
      userId: user.id,
    };
  });

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
          name: parsedValues.data.name,
          image: parsedValues.data.image,
          spotifyUrl: parsedValues.data.spotifyUrl,
          bio: cleanText(
            artistBio.artist.bio.content || artistBio.artist.bio.summary
          ),
          albums: {
            create: profileAlbums,
          },
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

export async function updateProfileAction(
  values: UpdateFormSchema,
  imageUrl: string | null,
  coverUrl: string | null
) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const userExists = await db.userProfile.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!userExists) {
    throw new Error("User not found");
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
        image: imageUrl,
        coverImage: coverUrl,
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
