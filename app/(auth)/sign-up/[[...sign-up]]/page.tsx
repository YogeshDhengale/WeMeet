import { SignUp } from "@clerk/nextjs";
import React from "react";

export async function generateStaticParams() {
  return [{ signUp: [] }];
}

function SignUpPage() {
  return (
    <main className="w-full flex-center h-screen">
      <SignUp />
    </main>
  );
}

export default SignUpPage;
