import { ThemeColor, ThemeType } from "@prisma/client";
import * as z from "zod";

export const userQuery = z.object({
  artistName: z.string().min(1),
  createProfile: z.string().default("noise.site/"),
});

export type UserQuery = z.infer<typeof userQuery>;

export const createProfile = z.object({
  artistId: z.string().min(1),
  name: z.string().min(1),
  profileUrl: z.string().min(1),
  image: z.string().min(1),
  bio: z.string().min(1).optional(),
  spotifyUrl: z.string().min(1),
  token: z.string().min(1),
});

export type CreateProfile = z.infer<typeof createProfile>;

export const updateFormSchema = z.object({
  name: z.string().min(1).max(20),
  bio: z.string().min(1),
  theme: z.object({
    type: z.nativeEnum(ThemeType),
    color: z.nativeEnum(ThemeColor),
  }),
});

export type UpdateFormSchema = z.infer<typeof updateFormSchema>;

export const linksFormSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
});

export type LinksFormSchema = z.infer<typeof linksFormSchema>;
