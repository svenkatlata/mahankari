import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";
import BestSelling from "../components/BestSelling";
import NewArrivals from "../components/NewArrivals";
import Exclusive from "../components/Exclusive";
import Trending from "../components/Trending";

const Home = () => {
  return (
    <div>
      <Hero />
      <Benefits />
      <Categories />
      <BestSelling />
      <Trending />
      <NewArrivals />
      <Exclusive />
    </div>
  );
};

export default Home;
