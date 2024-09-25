import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WeMeet",
  description: "Meeting app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pd-6 pt-28 pb-10 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}

export default HomeLayout;
