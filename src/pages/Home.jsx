import React from 'react';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Categories from '../components/Categories';
import NewArrivals from '../components/NewArrivals';
import Exclusive from '../components/Exclusive';
import Trending from "../components/Trending";
import { products } from '../components/ProductsData';

const Home = () => {
  console.log('images in home', products);
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
