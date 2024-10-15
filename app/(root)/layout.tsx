import StreamVideoProvider from "@/Providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Meeting",
  description: "Meeting app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export async function generateStaticParams() {
  return [
    { slug: [] }, // this represents /sign-up
    { slug: ["meeting"] }, // this represents /sign-up/sign-up (as a fallback example)
  ];
}

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
}

export default RootLayout;
