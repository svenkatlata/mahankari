import React from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import pageNotFound from "../assets/pageNotFound.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* <h1 className="text-6xl font-extrabold text-gray-800 mb-3">404</h1> */}
      <img src={pageNotFound} alt="404 Page Not Found" className="h-100 mb-6" />

      {/* <p className="text-lg font-semibold text-gray-700 mb-2">
        Oops! This page doesn't exist.
      </p> */}

      {/* <p className="text-base text-gray-600 max-w-[500px] leading-relaxed mb-6">
        We're currently working hard behind the scenes to launch our new
        website. Stay connected — join our mailing list or follow us on Facebook
        for updates.
      </p> */}

      <Link
        to="/"
        className="flex items-center gap-1 px-4 py-2 bg-[#671e4b] text-white rounded hover:bg-[#481133] transition"
      >
        <HomeOutlinedIcon sx={{ fontSize: 20 }} />
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
