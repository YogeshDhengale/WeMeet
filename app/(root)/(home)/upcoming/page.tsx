import CallList from "@/components/CallList/CallList";
import Container from "@/components/Container/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Upcoming meetings",
  description: "Had look on your upcoming meetings",
};

function Upcoming() {
  return (
    <Container title="Upcoming Meetings">
      <CallList type="upcoming" />
    </Container>
  );
}

export default Upcoming;
