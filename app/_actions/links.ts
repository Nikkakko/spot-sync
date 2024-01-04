"use server";
import db from "@/lib/db";
import { LinksFormSchema, linksFormSchema } from "@/lib/validation";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function addLinksAction(values: LinksFormSchema) {
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

  const parsedValues = linksFormSchema.safeParse(values);

  if (parsedValues.success) {
    await db.userProfile.update({
      where: {
        userId: user.id,
        id: userExists.id,
      },
      data: {
        socials: {
          create: {
            name: parsedValues.data.title,
            icon: parsedValues.data.name,
            url: parsedValues.data.url,
            userId: user.id,
          },
        },
      },
    });
  }

  revalidatePath("/customize");
  return {
    success: true,
    message: "Profile updated successfully",
  };
}

export async function deleteLinksAction(id: string) {
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

  await db.social.delete({
    where: {
      id,
    },
  });

  revalidatePath("/customize");
  return {
    success: true,
    message: "Profile updated successfully",
  };
}
