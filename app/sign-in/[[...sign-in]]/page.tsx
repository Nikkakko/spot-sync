import { Shell } from "@/components/layouts/Shell";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Shell variant="centered">
      <SignIn afterSignInUrl={"/onboarding"} />
    </Shell>
  );
}
