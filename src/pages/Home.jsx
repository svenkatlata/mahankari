import React from "react";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";
import NewArrivals from "../components/NewArrivals";
import { products } from "../components/ProductsData";

const Home = () => {
  console.log("images in home", products);
  return (
    <div>
      <Hero />
      <Benefits />
      <Categories />
      <NewArrivals />
    </div>
  );
};

export default Home;
