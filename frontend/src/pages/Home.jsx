import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";

const Home = () => {
  return (
    <div>
      {/* Mounting each components */}
      <Hero />
      <LatestCollection />
    </div>
  );
};

export default Home;
