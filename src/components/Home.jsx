import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Benefits from './Benefits';
import Categories from './Categories';
import NewArrivals from './NewArrivals';
import { products } from './ProductsData';

const Home = () => {
  console.log('images in home', products);
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
