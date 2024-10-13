import CallList from "@/components/CallList/CallList";
import Container from "@/components/Container/Container";
import React from "react";

function Recordings() {
  return (
    <Container title="Recordings">
      <CallList type="recordings" />
    </Container>
  );
}

export default Recordings;
