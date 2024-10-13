import PButton from "@/components/Button";
import Container from "@/components/Container/Container";
import ActionCards from "@/components/HomePageComponents/ActionCards/ActionCards";
import Hero from "@/components/HomePageComponents/Hero/Hero";
import React from "react";

function Home() {
  return (
    <Container>
      <Hero />
      <ActionCards />
      <PButton />
    </Container>
  );
}

export default Home;
