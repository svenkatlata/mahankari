import { useState } from "react";
import { useParams } from "react-router-dom";

import ToggleSwitch from "../components/ToggleSwitch";
import ProductCard from "../components/ProductCard";
import * as allproductsData from "../components/ProductsData";

const ProductListing = () => {
  const [inStockOnly, setInStockOnly] = useState(false);
  const { productsListing } = useParams();

  console.log("productsListing param:", productsListing);

  let categoryurl = "";
  productsListing.split("-").forEach((categoryword, idx) => {
    if (idx === 0) {
      categoryurl = categoryword;
    } else {
      var firstChar = categoryword.charAt(0).toUpperCase();
      categoryurl += firstChar + categoryword.slice(1);
    }
  });

  const filteredProducts = allproductsData[categoryurl];
  console.log("filteredProducts:", filteredProducts);

  //   const filteredProducts = inStockOnly
  //     ? products.filter((p) => p.inStock)
  //     : products;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ---------- Sidebar Filters ---------- */}
        <aside className="bg-white rounded-lg shadow-sm p-5 h-fit border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Availability */}
          <div className="mb-6">
            <button className="flex justify-between w-full text-left font-medium text-gray-700 mb-2">
              <span>Availability</span>
            </button>
            <div className="flex items-center gap-2">
              <ToggleSwitch />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <button className="flex justify-between w-full text-left font-medium text-gray-700 mb-2">
              <span>Price</span>
            </button>
            <div className="flex items-center gap-2 text-sm">
              <input
                type="number"
                placeholder="₹0"
                className="w-1/2 border border-gray-300 rounded-md px-2 py-1"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="₹2000"
                className="w-1/2 border border-gray-300 rounded-md px-2 py-1"
              />
            </div>
          </div>
        </aside>

        {/* ---------- Product Grid ---------- */}
        <main className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-700">
              {filteredProducts.length} Products
            </h2>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
