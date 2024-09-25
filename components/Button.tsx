import { cn } from "@/lib/utils";
import React from "react";

function PButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn("bg-green-900", props.className)} {...props}>
      {props.children}
    </button>
  );
}

export default PButton;
