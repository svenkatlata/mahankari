import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const ProductCard = ({ item, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalImages = item.images?.length || 0;
  const productTitle = item.product.split(" ").join("-").toLowerCase();
  const productInfo = `${productTitle}-${item.id.toLowerCase()}`;

  // Auto image change when hovered
  useEffect(() => {
    if (!isHovered || totalImages <= 1) return;
    setCurrentIndex(1); // Change image while hovered
  }, [isHovered, totalImages]);

  return (
    <Link to={`/products/${productInfo}`}>
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 shrink-0 w-66 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentIndex(0); // reset to first image when hover ends
        }}
      >
        {/* Sold Out Badge */}
        {item.isSoldOut && (
          <div className="absolute top-2 left-2 bg-white text-black text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-md z-1 flex items-center justify-center font-sans leading-none tracking-wide">
            SOLD OUT
          </div>
        )}

        {/* Add to Cart Button */}
        {!item.isSoldOut && (
          <button
            onClick={(e) => {
              e.preventDefault(); // prevent Link navigation
              e.stopPropagation();
              // onAddToCart?.(item);
            }}
            className={`absolute top-2 right-2 bg-white text-(--color-primary) p-2 rounded-full shadow-md transition-all duration-300 z-1 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <FaPlus size={14} />
          </button>
        )}

        {/* Image Carousel */}
        <div className="relative">
          {totalImages > 0 && (
            <img
              src={
                item.images[currentIndex].default || item.images[currentIndex]
              }
              alt={item.product}
              className={`aspect-3/4 object-cover rounded-t-lg w-full transition-all duration-500 ${
                item.isSoldOut ? "opacity-60" : "opacity-100"
              }`}
            />
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h2 className="text-[17px]/5 font-semibold text-(--color-primary)">
            {item.product}
          </h2>
          <p className="text-gray-600 text-sm mt-1">Fabric: {item.fabric}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-[17px] font-medium text-(--color-primary)">
              ₹{item.price}/-
            </p>
            <p className="text-gray-500 text-sm">
              <span className="line-through">₹{item.mrp}/-</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
