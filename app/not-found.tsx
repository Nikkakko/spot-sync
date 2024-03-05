import { Shell } from "@/components/layouts/Shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <Shell variant="centered" className="items-start max-w-md">
      <h2 className="text-3xl font-semibold text-start mb-2 uppercase">
        Not quite my tempo!
      </h2>
      <p className="text-start text-black mb-8">
        You have lost your way or we just didn&apos;t find what you&apos;re
        looking for! Why not get back to the homepage!
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
        Return Home
      </Link>
    </Shell>
  );
}
