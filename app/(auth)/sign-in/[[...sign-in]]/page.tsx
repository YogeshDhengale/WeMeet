import { SignIn } from "@clerk/nextjs";
import React from "react";

export async function generateStaticParams() {
  return [
    { slug: [] },        // this represents /sign-up
    { slug: ['sign-in'] } // this represents /sign-up/sign-up (as a fallback example)
  ];
}

function SignInPage() {
  return (
    <main className="w-full flex-center h-screen">
      <SignIn />
    </main>
  );
}

export default SignInPage;
