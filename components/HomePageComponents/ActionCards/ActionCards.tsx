"use client";

import React, { useState } from "react";
import Card from "./Card/Card";
import MeetingModal from "@/components/MeetingModal/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker"

interface ValState {
  dateTime: Date;
  description: string;
  link: string;
}

function ActionCards() {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = useState<
    "isSchedule" | "isJoin" | "isInstant" | undefined
  >();

  const [val, setVal] = useState<ValState>({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const [loading, setLoading] = useState(false);

  const handleCreateMeeting = async () => {
    if (!client || !user) return;
    setLoading(true);
    try {
      if (!val.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startAt =
        val.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = val.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!val.description) {
        setLoading(false);
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created successfully please wait for a movement.",
      });
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Failed to create call",
      });
      console.error(error);
    }
  };

  const cards = [
    {
      className: "bg-orange-1",
      title: "New Meeting",
      img: "/icons/add-meeting.svg",
      description: "Start an instant meeting",
      handleClick: () => setMeetingState("isInstant"),
    },
    {
      className: "bg-blue-1",
      title: "Join Meeting",
      img: "/icons/join-meeting.svg",
      description: "Via invitation link",
      handleClick: () => setMeetingState("isJoin"),
    },
    {
      className: "bg-purple-1",
      img: "/icons/schedule.svg",
      title: "Schedule Meeting",
      description: "Plan your meeting",
      handleClick: () => setMeetingState("isSchedule"),
    },
    {
      className: "bg-yellow-1",
      img: "/icons/recordings.svg",
      title: "View Recordings",
      description: "Check out your recordings",
      handleClick: () => {},
    },
  ];

  const handleChangeVal = (key: keyof ValState, value: string | Date) => {
    setVal((pre) => ({ ...pre, [key]: value }));
  };

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((e) => (
        <Card key={e.title} {...e} />
      ))}

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isSchedule"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={handleCreateMeeting}
        >
          <div className="flex-col flex gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add Description
            </label>
            <Textarea
              className="border-none bg-dark-2  focus-visible:ring-0 focus-visible:ring-offset-0"
              name="description"
              onChange={({ target: { value, name } }) =>
                handleChangeVal(name as keyof ValState, value)
              }
            />
          </div>
          <div className="flex-col w-full flex gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker selected={val.dateTime} 
              name="dateTime"
              onChange={(date) => handleChangeVal("dateTime", date!)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="bg-dark-1 w-full rounded p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isSchedule"}
          onClose={() =>  (undefined)}
          title="Meeting Created"
          className="text-center"
          btnText="Copy Meeting Link"
          img="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          handleClick={() => {
            //  navigator.clipboard.writeText(meetinglink);
            //  toast({title: "Link copied"})
          }}
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstant"}
        onClose={() => setMeetingState(undefined)}
        title={"Start an Instant Meeting"}
        className="text-center"
        disabled={loading}
        buttonIcon={loading ? "/icons/loading-circle.svg" : ""}
        btnText="Start Meeting"
        handleClick={handleCreateMeeting}
      />
    </section>
  );
}

export default ActionCards;
