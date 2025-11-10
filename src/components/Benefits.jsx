import React from "react";
import { IoDiamond, IoArrowUndo} from "react-icons/io5";
import { FaTruckFast, FaTags, FaPeopleGroup, FaLeaf} from "react-icons/fa6";



const Benefits = () => {
  return (
    <section>
      <div className="max-w-screen mx-auto px-5 py-10 sm:px-20 bg-(--color-primary)">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-base text-(--color-secondary)">
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <FaPeopleGroup  className="text-4xl mx-auto" />
            <span>Support Traditional Weavers</span>
          </li>
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <IoDiamond className="text-4xl mx-auto" />
            <span>Premium Limited Editions</span>
          </li>
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <FaLeaf className="text-4xl mx-auto" />
            <span>100% Natural, Long-Lasting Dyes</span>
          </li>
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <FaTags className="text-4xl mx-auto" />
            <span>Affordable Handpicked Elegance</span>
          </li>
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <FaTruckFast className="text-4xl mx-auto" />
            <span>Free Shipping Across India</span>
          </li>
          <li className="flex flex-col gap-4 p-2 md:px-4">
            <IoArrowUndo className="text-4xl mx-auto" />
            <span>7-day Hassle-free Returns*</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
