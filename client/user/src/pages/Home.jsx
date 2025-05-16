import React from "react";
import { UserAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/index.css";
import Hero from "../components/Hero";
import Offer from "../components/Offer";
import Service from "../components/Service";
import Menu from "../components/Menu";

const Home = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  console.log(session);

  return (
    <div className="App mx-auto">
      <div className="bg-background rounded-b-4xl h-screen ">
        <div className="flex flex-col container mx-auto ">
          <div className="my-4"></div>

          <div>
            <Hero />
          </div>
        </div>
      </div>
      <div className="flex flex-col container mx-auto items-start">
        <Offer />
        <Service />
        <Menu />
      </div>
    </div>
  );
};

export default Home;
