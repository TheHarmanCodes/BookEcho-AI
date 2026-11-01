import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="container wrapper flex min-h-[calc(100vh-140px)] items-center justify-center py-10">
      <SignUp />
    </main>
  );
}
