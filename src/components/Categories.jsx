import React from "react";
import { Link, useNavigate } from "react-router-dom";

import category1 from "../assets/category-1.png";
import category2 from "../assets/category-2.png";
import category3 from "../assets/category-3.png";
import category4 from "../assets/category-4.png";
import category5 from "../assets/category-5.png";
import category6 from "../assets/category-6.png";
import category7 from "../assets/category-7.png";
import category8 from "../assets/category-8.png";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, image: category1, title: "Chennur Silk Sarees" },
    { id: 2, image: category2, title: "Kota Doriya Sarees" },
    { id: 3, image: category3, title: "Malai Cotton Sarees" },
    { id: 4, image: category4, title: "Handloom Cotton Sarees" },
    { id: 5, image: category5, title: "Bengal Soft Cotton Sarees" },
    { id: 6, image: category6, title: "Kota Cotton Sarees" },
    { id: 7, image: category7, title: "Munga Kota Cotton Sarees" },
    { id: 8, image: category8, title: "Pure Cotton Sarees" },
  ];

  const renderCategories = () => {
    return categories.map((category) => {
      const { id, image, title } = category;
      const linkurl = `/collections/${title
        .split(" ")
        .join("-")
        .toLowerCase()}`;
      return (
        <div
          key={id}
          className="border-none bg-(--color-primary) rounded-lg hover:scale-102 transition-transform duration-500 text-(--color-secondary)"
        >
          <Link to={linkurl} className="cursor-pointer">
            <img
              src={image}
              alt={title}
              className="object-cover rounded-t-lg"
            />
            <h2 className="text-lg font-medium p-4">{title}</h2>
          </Link>
        </div>
      );
    });
  };

  const viewAllCatogories = () => {
    navigate("/collections/sarees");
  };

  return (
    <section>
      <div className="p-10 pt-30 pb-20 text-center text-(--color-primary)">
        <h1 className="text-3xl tracking-wider fond-semibold font-[Georgia]">
          SAREE COLLECTIONS
        </h1>
        {/* Category Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {renderCategories()}
        </div>
        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button
            className="bg-(--color-primary) hover:bg-(--color-topbar) text-white font-medium py-3 px-8 transition-colors duration-300 cursor-pointer"
            onClick={viewAllCatogories}
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
