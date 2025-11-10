import { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";

const ProductListing = () => {
  const [inStockOnly, setInStockOnly] = useState(false);

  const products = [
    {
      id: 1,
      name: "Pure Mulmul Cotton - MC1013",
      oldPrice: 1750,
      newPrice: 1400,
      discount: "20%",
      img: "/images/saree-black.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Mulmul Cotton - MC985",
      oldPrice: 1750,
      newPrice: 1575,
      discount: "10%",
      img: "/images/saree-yellow.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Pure Mulmul Cotton - MC984",
      oldPrice: 1750,
      newPrice: 1575,
      discount: "10%",
      img: "/images/saree-green.jpg",
      inStock: true,
    },
  ];

  const filteredProducts = inStockOnly
    ? products.filter((p) => p.inStock)
    : products;

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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    SAVE {product.discount}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-800 text-sm mb-2">
                    {product.name.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 line-through">
                      ₹{product.oldPrice}/-
                    </span>
                    <span className="text-red-600 font-semibold">
                      ₹{product.newPrice}/-
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
