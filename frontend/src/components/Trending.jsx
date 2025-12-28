import React, { useRef, useState, useEffect } from "react";
import { trending } from "./ProductsData";
import ProductCard from "./ProductCard";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Trending = () => {
  console.log("trending", trending);
  const carouselRef = useRef(null);
  const [isBackHidden, setIsBackHidden] = useState(true);
  const [isForwardHidden, setIsForwardHidden] = useState(false);

  const scroll = (direction) => {
    const { current } = carouselRef;
    const scrollAmount = current.offsetWidth; // scroll by one screen width
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const { current } = carouselRef;
    const handleScroll = () => {
      if (!current) return;
      setIsBackHidden(current.scrollLeft <= 0);
      setIsForwardHidden(
        current.scrollLeft + current.clientWidth >= current.scrollWidth - 10
      );
    };

    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section>
      <div className="p-10 text-(--color-primary)">
        <h1 className="text-3xl tracking-wider fond-semibold font-[Georgia] text-center pb-6">
          TRENDING SAREES
        </h1>
        {/* Carousel container */}
        <div className="relative py-10">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            hidden={isBackHidden}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition z-10"
          >
            <IoChevronBack className="text-gray-700 text-xl" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-5"
          >
            {trending.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            hidden={isForwardHidden}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition z-10"
          >
            <IoChevronForward className="text-gray-700 text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trending;
