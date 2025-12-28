import React from "react";
import { Link } from "react-router-dom";
import pagenotfound from "../assets/pagenotfound.png"

const PageNotFound = () => {
  return (
    <div className="w-full flex justify-center">
    <div className="max-w-3xl min-h-150 flex flex-col items-center justify-center text-center">
      <img src={pagenotfound} alt="404 - PAGE NOT FOUND" className="h-30 sm:h-50" />
      <p className="text-base sm:text-lg text-gray-600 mx-10 sm:mx-20 mt-5 mb-10">
        The page you are looking for might have been removed, 
        had its name changed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-(--color-primary) text-white hover:bg-(--color-topbar) transition"
      >
        GO TO HOMEPAGE
      </Link>
    </div>
    </div>
  );
};

export default PageNotFound;
