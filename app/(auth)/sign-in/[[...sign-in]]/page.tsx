import { SignIn } from "@clerk/nextjs";
import React from "react";

export async function generateStaticParams() {
  return [{ signIn: [] }];
}

function SignInPage() {
  return (
    <main className="w-full flex-center h-screen">
      <SignIn />
    </main>
  );
}

export default SignInPage;
