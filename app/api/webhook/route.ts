import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import db from "@/lib/db";
import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/subscription";

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

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object.id as Stripe.Subscription["id"]
        );
        break;

      default:
        console.warn(`Unhandled event type: ${event.type}`);
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
