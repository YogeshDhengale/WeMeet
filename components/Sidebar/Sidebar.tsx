import React from "react";
import NavItems from "../NavItems/NavItems";

function Sidebar() {
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <NavItems isFullScreen/>
    </section>
  );
}

export default Sidebar;
