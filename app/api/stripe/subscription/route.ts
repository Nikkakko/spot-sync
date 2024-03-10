import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settingsUrl = absoluteUrl("/customize");

export async function POST(req: Request) {
  const body = await req.json();
  const { price, interval } = body;

  const formatedPrice = Number(price);
  const formatedInterval =
    interval.toLowerCase() === "monthly" ? "month" : "year";

  if (!price || !interval) {
    return new NextResponse("Invalid Request", { status: 400 });
  }

  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await db.userSubscription.findFirst({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Go Pro",
              description: "Get your Noise to the next level",
            },
            unit_amount: formatedPrice * 100,
            recurring: {
              interval: formatedInterval,
            },
          },

          quantity: 1,
        },
      ],

      metadata: {
        userId: user.id,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log(error, "Stripe error");
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
