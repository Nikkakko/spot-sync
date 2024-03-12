import { auth } from "@clerk/nextjs";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { UserSubscription } from "@prisma/client";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!userSubscription) return false;

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};

export const subEndDate = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
    },
  });

  return userSubscription?.stripeCurrentPeriodEnd;
};

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  if (!session.metadata?.userId) {
    throw new Error("Invalid Request");
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );
  const userId = session.metadata.userId;

  const userSubscription = await db.userSubscription.findFirst({
    where: { userId },
  });

  if (userSubscription) {
    await updateSubscription(session, subscription);
  } else {
    await createSubscription(userId, session, subscription);
  }
}

async function updateSubscription(
  session: Stripe.Checkout.Session,
  subscription: Stripe.Subscription
) {
  if (!session.metadata?.userId) return;
  await db.userSubscription.update({
    where: { userId: session.metadata.userId },
    data: {
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

async function createSubscription(
  userId: string,
  session: Stripe.Checkout.Session,
  subscription: Stripe.Subscription
) {
  await db.userSubscription.create({
    data: {
      userId,
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: session.subscription as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

export async function handleSubscriptionDeleted(subscriptionId: string) {
  const userSubscription = await db.userSubscription.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!userSubscription || !userSubscription.userId) {
    throw new Error("Invalid Request");
  }

  await updateProfileAndDeleteSubscription(userSubscription);
}

async function updateProfileAndDeleteSubscription(
  userSubscription: UserSubscription
) {
  const userId = userSubscription.userId;
  const userProfile = await db.userProfile.findFirst({ where: { userId } });

  if (userProfile) {
    await db.userProfile.update({
      where: { id: userProfile.id },
      data: {
        theme: {
          update: {
            color: "DEFAULT",
            type: "DEFAULT",
          },
        },
      },
    });
  }

  await db.userSubscription.delete({ where: { userId } });
}
