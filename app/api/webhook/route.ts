import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import db from "@/lib/db";

export async function POST(req: Request, res: Response) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  // Check that the STRIPE_WEBHOOK_SECRET environment variable is set
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case "checkout.session.completed":
        if (!session.metadata?.userId) {
          return new NextResponse("Invalid Request", { status: 400 });
        }

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const userSubscription = await db.userSubscription.findFirst({
          where: {
            userId: session.metadata.userId,
          },
        });

        if (userSubscription) {
          await db.userSubscription.update({
            where: {
              userId: session.metadata.userId,
            },
            data: {
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ),
            },
          });
        } else {
          await db.userSubscription.create({
            data: {
              userId: session.metadata.userId,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ),
            },
          });
        }
    }

    return new NextResponse(null, {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`Invalid webhook request ${error.message}`, {
      status: 400,
    });
  }
}
