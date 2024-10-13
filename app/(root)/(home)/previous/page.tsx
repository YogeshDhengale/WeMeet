import CallList from "@/components/CallList/CallList";
import Container from "@/components/Container/Container";
import React from "react";

function Previous() {
  return (
    <Container title={"Previous"}>
      <CallList type="ended" />
    </Container>
  );
}

export default Previous;
