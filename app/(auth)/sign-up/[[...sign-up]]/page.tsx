import { SignUp } from "@clerk/nextjs";
import React from "react";

export async function generateStaticParams() {
  return [
    { slug: [] },        // this represents /sign-up
    { slug: ['sign-up'] } // this represents /sign-up/sign-up (as a fallback example)
  ];
}

function SignUpPage() {
  return (
    <main className="w-full flex-center h-screen">
      <SignUp />
    </main>
  );
}

export default SignUpPage;
