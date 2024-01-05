import { Shell } from "@/components/layouts/Shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <Shell variant="centered" className="items-center max-w-sm">
      <h2 className="text-4xl font-bold text-start mb-4">
        Not quite my tempo!
      </h2>
      <p className="text-start text-gray-600 mb-8">
        You have lost your way or we just didn&apos;t find what you&apos;re
        looking for! Why not get back to the homepage!
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
        Return Home
      </Link>
    </Shell>
  );
}
