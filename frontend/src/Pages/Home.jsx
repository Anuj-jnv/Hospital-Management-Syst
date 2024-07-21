import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to AI Medical Technology | Your Trusted Healthcare Provider"
        }
        imageUrl={"/Hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;