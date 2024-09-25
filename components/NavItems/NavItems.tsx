"use client";

import React from "react";
import { sidebarLinks } from "@/constants/Urls";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";

function NavItems({ isFullScreen = false }: { isFullScreen?: boolean }) {
  const pathname = usePathname();
  const size = isFullScreen ? 24 : 20;
  const Wrapper = !isFullScreen ? SheetClose : "div";
  return (
    <div className="flex flex-1 flex-col gap-6">
      {sidebarLinks.map((link) => {
        const isActive =
          pathname === link.route ||pathname.startsWith(`${link.route}/`);

        return (
          <Wrapper key={link.label} asChild>
            <Link
              href={link.route}
              className={cn("flex gap-4 items-center p-4 rounded-lg", {
                "bg-blue-1": isActive,
                "justify-start": isFullScreen,
                "w-full md:max-w-60": !isFullScreen,
              })}
            >
              <>
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={size}
                  height={size}
                />
                <p
                  className={cn({
                    "text-lg font-semibold max-lg:hidden": isFullScreen,
                    "font-semibold": !isFullScreen,
                  })}
                >
                  {link.label}
                </p>
              </>
            </Link>
          </Wrapper>
        );
      })}
    </div>
  );
}

export default NavItems;
