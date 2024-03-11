import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settingsUrl = absoluteUrl("/customize");

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const { userId } = auth();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await db.userSubscription.findFirst({
      where: {
        userId,
      },
    });

    //cancel subscription
    if (userSubscription && userSubscription.stripeSubscriptionId) {
      await stripe.subscriptions.cancel(
        userSubscription.stripeSubscriptionId as string,
        {
          cancellation_details: {
            comment: "User requested cancellation",
          },
        }
      );
    } else {
      return new NextResponse("Invalid Request", { status: 400 });
    }

    return new NextResponse(JSON.stringify({ url: settingsUrl }), {
      status: 204,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
