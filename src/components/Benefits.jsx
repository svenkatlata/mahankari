import React from 'react';
import { IoDiamond, IoArrowUndo } from 'react-icons/io5';
import { FaTruckFast, FaTags } from 'react-icons/fa6';

const Benefits = () => {
  return (
    <section>
      <div className="max-w-3xl mx-auto text-center font-semibold py-20 px-4 text-(--color-primary)">
        <span>
          We are committed to preserving India's rich heritage and promoting
          sustainable clothing.
        </span>
        <br />
        <span>
          By collaborating directly with traditional weavers across India, we
          bring you authentic handloom products — crafted with care, rich in
          texture, and made to last a lifetime. Each piece celebrates India's
          textile legacy and supports the delicate economy of the local artisans
          who keep it alive.
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-20 pb-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-10 text-center font-semibold text-(--color-primary)">
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <IoDiamond className="text-6xl mx-auto" />
            <span>Handpicked Premium Quality</span>
          </li>
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <FaTags className="text-6xl mx-auto" />
            <span>Affordable Prices</span>
          </li>
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <FaTruckFast className="text-6xl mx-auto" />
            <span>Free Shipping across India</span>
          </li>
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <IoArrowUndo className="text-6xl mx-auto" />
            <span>7-day Return Policy*</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
