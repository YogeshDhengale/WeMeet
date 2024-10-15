import MeetingClient from "@/components/MeetingPageComponents/MeetingClient/MeetingClient";
import React from "react";

function Meeting({ params: { id } }: { params: { id: string } }) {
  return (
    <main className="h-screen w-full">
      <MeetingClient meetingId={id} />
    </main>
  );
}

export default Meeting;
