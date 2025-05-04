import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSellers from "../components/BestSellers";
import OurPolicy from "../components/OurPolicy";

const Home = () => {
  return (
    <div>
      {/* Mounting each components */}
      <Hero />
      <LatestCollection />
      <BestSellers />
      <OurPolicy />
    </div>
  );
};

export default Home;
