import React, { useEffect, useState, useRef } from 'react';
import hero_1 from '../assets/hero_1.png';
import hero_2 from '../assets/hero_2.png';
import hero_3 from '../assets/hero_3.png';
import hero_4 from '../assets/hero_4.png';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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
          <img src={s} key={idx} className="w-full shrink-0" draggable="false" />
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-8 px-8 bg-(--color-primary)">
        <button
          onClick={() => {
            prev();
            resetInterval();
          }}
          className="p-4 text-(--color-secondary) hover:text-(--color-accent)"
        >
          <FaAngleLeft className="h-8" />
        </button>
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setCurr(i);
                resetInterval();
              }}
              className={`transition-all w-3 h-3 rounded-full cursor-pointer ${
                curr === i
                  ? 'bg-(--color-secondary) p-2'
                  : 'bg-(--color-secondary)/50'
              }`}
            ></div>
          ))}
        </div>
        <button
          onClick={() => {
            next();
            resetInterval();
          }}
          className="p-4 text-(--color-secondary) hover:text-(--color-accent)"
        >
          <FaAngleRight className="h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
