import React, { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const ProductCard = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalImages = item.images?.length || 0;

  // Auto image change when hovered
  useEffect(() => {
    if (!isHovered || totalImages <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 700); // Change image while hovered

    return () => clearInterval(interval);
  }, [isHovered, totalImages]);

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 shrink-0 w-60 cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentIndex(0); // reset to first image when hover ends
      }}
    >
      {/* Image Carousel */}
      <div className="relative">
        {totalImages > 0 && (
          <img
            src={item.images[currentIndex].default || item.images[currentIndex]}
            alt={item.product}
            className="aspect-3/4 object-cover rounded-t-lg w-full transition-all duration-500"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-[17px]/5 font-semibold">{item.product}</h3>
        <p className="text-gray-600 text-sm mt-1">Fabric: {item.fabric}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-[17px] font-medium text-red-600">
            ₹{item.price}/-
          </p>
          <p className="text-gray-600 text-sm">
            <span className="line-through">₹{item.mrp}/-</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
