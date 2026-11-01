import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="container wrapper flex min-h-[calc(100vh-140px)] items-center justify-center py-10">
      <SignIn />
    </main>
  );
}
