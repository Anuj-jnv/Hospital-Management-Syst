import React from "react";
import Section from "../components/Layout/Section";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      {/* HERO — white background */}
      <Section variant="white" >
        <Hero
          title="Welcome to CareConnect | Your Trusted Healthcare Provider"
          imageUrl="/Hero.png"
        />
      </Section>

      {/* BIOGRAPHY — light background */}
      <Section variant="light">
        <Biography imageUrl="/about.png" />
      </Section>

      {/* DEPARTMENTS — white background */}
      <Section variant="subtle">
        <Departments />
      </Section>

      {/* MESSAGE FORM — subtle background */}
      <Section variant="white">
        <MessageForm />
      </Section>
    </>
  );
};

export default Home;
