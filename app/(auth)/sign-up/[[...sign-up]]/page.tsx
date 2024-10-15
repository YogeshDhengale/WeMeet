import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
  return (
    <main className="w-full flex-center h-screen">
      <SignUp />
    </main>
  );
}

export default SignUpPage;
