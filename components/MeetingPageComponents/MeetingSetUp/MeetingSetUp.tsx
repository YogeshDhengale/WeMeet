"use client";

import { useEffect, useState } from "react";
import {
    DeviceSettings,
    useCall,
    VideoPreview,
} from "@stream-io/video-react-sdk";
import { Button } from "@/components/ui/button";

function MeetingSetUp({
  setIsSetup,
}: {
  setIsSetup: (value: boolean) => void;
}) {
  const call = useCall();
  const [isMicCam, setIsMicCam] = useState(false);

  if (!call) {
    throw new Error("Usecall must be used within Stream call component");
  }

  useEffect(() => {
    if (isMicCam) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCam, call.camera, call.microphone]);

  const handleJoinMeeting = () => {
    call.join();
    setIsSetup(true);
  };

  return (
    <div className="flex-center overflow-auto min-h-max p-8 h-screen w-full flex-col text-white gap-3 ">
      <h1 className="text-2xl font-bold">SetUp</h1>
      <VideoPreview />
      <div className="flex-center gap-4 h-16">
        <label className="flex-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCam}
            onChange={(e) => setIsMicCam(e.target.checked)}
          />
          Join with mic and camera off!
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={handleJoinMeeting}
      >
        Join Meeting
      </Button>
    </div>
  );
}

export default MeetingSetUp;
