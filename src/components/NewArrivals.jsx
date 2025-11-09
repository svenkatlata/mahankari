import React, {useRef} from 'react';
import { newArrivals } from "./ProductsData";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NewArrivals = () => {
  console.log("newArrivals", newArrivals);
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const { current } = carouselRef;
    const scrollAmount = current.offsetWidth; // scroll by one screen width
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <section>
        <div className="p-10 pb-20 text-center text-(--color-primary)">
            <h1 className="text-3xl tracking-wider fond-semibold font-[Georgia]">
                NEW ARRIVALS
            </h1>
            {/* Carousel container */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition z-10"
          >
            <FaChevronLeft className="text-gray-700 text-xl" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="min-w-[250px] md:min-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 shrink-0"
              >
                {
                  item.images && item.images.length > 0 && item.images.map((img, idx) => (
                    <img
                      src={(item.images[idx].default || item.images[idx])}
                      alt={item.product}
                      className="w-full h-56 object-cover rounded-t-2xl"
                    />
                  ))
                }
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.product}
                  </h3>
                  <p className="text-blue-600 font-semibold mt-2">
                    {item.price}
                  </p>
                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition z-10"
          >
            <FaChevronRight className="text-gray-700 text-xl" />
          </button>
        </div>
        </div>
    </section>
  )
}

export default NewArrivals