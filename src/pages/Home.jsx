import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";
import NewArrivals from "../components/NewArrivals";
import Exclusive from "../components/Exclusive";
import Trending from "../components/Trending";

const Home = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <Benefits />
      <Categories />
      <Trending />
      <NewArrivals />
      <Exclusive />
    </div>
  );
};

export default Home;
