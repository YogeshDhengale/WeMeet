"use client";

import Container from "@/components/Container/Container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({ title, desc }: { title: string; desc: string }) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row mt-5">
    <h3 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
      {title}
    </h3>
    <h3 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
      {desc}
    </h3>
  </div>
);

function PersonalRoom() {
  const { user } = useUser();
  const { toast } = useToast();
  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const router = useRouter()

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);

      await newCall?.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
      router.push(`/meeting/${meetingId}?personal=true`)
    }
  };

  return (
    <Container title={"Personal Room  "}>
      <div className="fle w-full flex-col gap-8 xl:max-w-[900px] mt-[-1.25rem]">
        <Table title="Topic" desc={`${user?.username}' meeting Room`} />
        <Table title="Meeting ID" desc={`${user?.id}`} />
        <Table title="Invite Link" desc={`${meetingLink}`} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-2"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </Container>
  );
}

export default PersonalRoom;
