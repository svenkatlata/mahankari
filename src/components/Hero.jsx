import React, { useEffect, useState } from 'react';
import hero_1 from '../assets/hero_1.png';
import hero_2 from '../assets/hero_2.png';
import hero_3 from '../assets/hero_3.png';
import hero_4 from '../assets/hero_4.png';
import { FaAngleLeft, FaAngleRight} from 'react-icons/fa';

const Hero = () => {
  const slides = [hero_1, hero_2, hero_3, hero_4];
  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  let slideInterval;

  useEffect(() => {
    slideInterval = setInterval(next, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  const onSlideImgClick = (slideIdx) => {
    setCurr(slideIdx);
    clearInterval(slideInterval);
  };

  return (
    <section className="overflow-hidden relative pt-37">
      <div
        className="flex transition-transform ease-out duration-500 cursor-pointer"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <img src={s} key={idx} />
        ))}
      </div>
      <div className="flex justify-center gap-8 px-8 bg-(--color-primary)">
        <button
          onClick={prev}
          className="p-4 text-(--color-secondary) hover:text-(--color-accent) cursor-pointer"
        >
          <FaAngleLeft className="h-8" />
        </button>
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => onSlideImgClick(i)}
              className={`transition-all w-3 h-3 rounded-full cursor-pointer ${
                curr === i
                  ? 'bg-(--color-secondary) p-2'
                  : 'bg-(--color-secondary)/50'
              }`}
            ></div>
          ))}
        </div>
        <button
          onClick={next}
          className="p-4 text-(--color-secondary) cursor-pointer hover:text-(--color-accent)"
        >
          <FaAngleRight className="h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
