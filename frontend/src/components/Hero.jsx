import React, { useEffect, useState, useRef } from "react";
import hero_1 from "../assets/hero_1.png";
import hero_2 from "../assets/hero_2.png";
import hero_3 from "../assets/hero_3.png";
import hero_4 from "../assets/hero_4.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Hero = () => {
  const slides = [hero_1, hero_2, hero_3, hero_4];
  const [curr, setCurr] = useState(0);
  const intervalRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  // Auto-slide
  useEffect(() => {
    intervalRef.current = setInterval(next, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 3000);
  };

  const handleStart = (clientX) => {
    startX.current = clientX;
    isDragging.current = true;
  };

  const handleEnd = (clientX) => {
    if (!isDragging.current) return;
    const diff = clientX - startX.current;
    if (Math.abs(diff) > 30) {
      if (diff > 0) prev();
      else next();
    }
    isDragging.current = false;
    resetInterval();
  };

  return (
    <section className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500 select-none"
        style={{ transform: `translateX(-${curr * 100}%)` }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseUp={(e) => handleEnd(e.clientX)}
        onMouseLeave={(e) => handleEnd(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
      >
        {slides.map((s, idx) => (
          <img
            src={s}
            key={idx}
            className="w-full shrink-0"
            draggable="false"
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => {
          prev();
          resetInterval();
        }}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white/0 rounded-full hover:bg-white/30 text-(--color-secondary)"
      >
        <IoChevronBack className="text-xl" />
      </button>

      <button
        onClick={() => {
          next();
          resetInterval();
        }}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white/0 rounded-full hover:bg-white/30 text-(--color-secondary)"
      >
        <IoChevronForward className="text-xl" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setCurr(i);
              resetInterval();
            }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              curr === i
                ? "bg-white p-1"
                : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
