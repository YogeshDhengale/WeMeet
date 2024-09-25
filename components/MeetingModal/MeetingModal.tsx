import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  title: string;
  btnText?: string;
  handleClick: () => void;
  children?: ReactNode;
  img?: string;
  buttonIcon?: string;
  disabled?: boolean;
}

function MeetingModal({
  isOpen,
  onClose,
  title,
  className,
  btnText,
  handleClick,
  children,
  img,
  buttonIcon,
  disabled
}: Props) {
  if (!isOpen) return null; // If modal is not open, render nothing

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {img && (
            <div className="flex justify-center">
              <Image src={img} alt="img" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
          {children}
          <Button className="bg-blue-1 focus-visible:right-0  focus-visible:ring-offset-0" disabled={disabled} onClick={handleClick}>
            {buttonIcon && <Image src={buttonIcon} alt="" width={13} height={13} />} &nbsp;
            {btnText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal;
