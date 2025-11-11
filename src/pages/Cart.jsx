import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [quantity, setQuantity] = useState(2);
  const price = 2100;
  const total = quantity * price;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold">Your cart</h1>
        <a href="/shop" className="underline text-gray-700 hover:text-black">
          Continue shopping
        </a>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 text-sm font-semibold text-gray-500 border-b pb-2 mb-4">
        <div className="col-span-6">PRODUCT</div>
        <div className="col-span-3 text-center">QUANTITY</div>
        <div className="col-span-3 text-right">TOTAL</div>
      </div>

      {/* Cart Item */}
      <div className="grid grid-cols-12 items-center py-4 border-b">
        {/* Product Image */}
        <div className="col-span-6 flex items-center gap-4">
          <img
            src="https://via.placeholder.com/100x140"
            alt="Blue Pen Kalamkari Chennur Silk Dupatta"
            className="w-24 h-32 object-cover"
          />
          <div>
            <h2 className="font-medium text-lg">
              Blue Pen Kalamkari Chennur Silk Dupatta
            </h2>
            <p className="text-gray-600">Rs. {price.toFixed(2)}</p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="col-span-3 flex justify-center items-center gap-3">
          <button
            onClick={handleDecrease}
            className="border px-3 py-1 text-xl hover:bg-gray-100"
          >
            −
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="border px-3 py-1 text-xl hover:bg-gray-100"
          >
            +
          </button>
          <FaTrash className="ml-3 text-gray-500 hover:text-red-600 cursor-pointer" />
        </div>

        {/* Total */}
        <div className="col-span-3 text-right font-medium">
          Rs. {total.toFixed(2)}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-10">
        <div className="w-full md:w-1/3">
          <div className="flex justify-between text-lg mb-2">
            <span className="font-semibold">Estimated total</span>
            <span className="font-semibold">Rs. {total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Taxes, Discounts and shipping calculated at checkout
          </p>
          <button className="w-full bg-black text-white py-3 text-lg font-medium hover:bg-gray-800 transition">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
