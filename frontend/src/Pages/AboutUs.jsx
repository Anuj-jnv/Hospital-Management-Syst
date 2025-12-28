import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Section from "../components/Layout/Section.jsx";


const AboutUs = () => {
  return (
    <>
    <Section variant="white">
      <Hero
        title={"Learn More About Us | AI Medical Technology"}
        imageUrl={"/about.png"}
      />
    </Section>
    <Section variant="substle">
      <Biography imageUrl={"/whoweare.png"} />
    </Section>
    </>
  );
};

export default AboutUs;