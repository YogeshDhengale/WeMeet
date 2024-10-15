"use client";

import MeetingRoom from "@/components/MeetingPageComponents/MeetingRoom/MeetingRoom";
import MeetingSetUp from "@/components/MeetingPageComponents/MeetingSetUp/MeetingSetUp";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import React, { useState } from "react";

interface MeetingProps {
  params: {
    id: string;
  };
}

export default function Meeting({ params }: MeetingProps) {
  const { isLoaded } = useUser();
  const [isSetup, setIsSetup] = useState(false);

  // Use your hook to get the call by ID
  const { call, isCallLoading } = useGetCallById(params.id);

  // Handle loading states
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetup ? (
            <MeetingSetUp setIsSetup={setIsSetup} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}
