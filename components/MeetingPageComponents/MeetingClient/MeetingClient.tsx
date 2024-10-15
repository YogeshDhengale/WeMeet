"use client";

import React, { useState } from "react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetUp from "../MeetingSetUp/MeetingSetUp";
import MeetingRoom from "../MeetingRoom/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader/Loader";

function MeetingClient({ meetingId }: { meetingId: string }) {
  const { isLoaded } = useUser();
  const [isSetup, setIsSetup] = useState(false);

  const { call, isCallLoading } = useGetCallById(meetingId);

  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetup ? <MeetingSetUp setIsSetup={setIsSetup} /> : <MeetingRoom />}
      </StreamTheme>
    </StreamCall>
  );
}

export default MeetingClient;
