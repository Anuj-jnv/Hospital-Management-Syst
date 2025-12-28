import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import Biography from "../components/Biography";
import Section from "../components/Layout/Section.jsx";

const Appointment = () => {
  return (
    <>
    <Section variant="white" >
      <Hero
        title={"Schedule Your Appointment | AI Medical Technology"}
        imageUrl={"/signin.png"}
      />
    </Section>
    <Section variant="light">
      <Biography imageUrl={"/about.png"} />
    </Section>
    <Section variant="white">
      <AppointmentForm/>
    </Section>
    </>
  );
};

export default Appointment;