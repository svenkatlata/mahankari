import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

// 🎨 Brand color (replace with your theme color)
const brandColor = "#481133"; // Tailwind gray-700 or your brand primary

// Styled MUI Slider
const BrandSlider = styled(Slider)({
  color: brandColor,
  height: 6,
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: `2px solid ${brandColor}`,
    "&:hover": {
      boxShadow: `0 0 0 8px ${brandColor}22`,
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.3,
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: brandColor,
  },
});

const RangeSlider = ({ min = 0, max = 10000, step = 100, onChange }) => {
  const [value, setValue] = useState([min, max / 2]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="w-full">
      <p className="text-gray-700 font-medium mb-2">Price</p>
      <BrandSlider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        valueLabelFormat={(val) => `₹${val}`}
        aria-labelledby="price-range-slider"
      />
      <div className="flex items-center gap-2 text-sm mt-2">
        <input
          type="number"
          value={value[0]}
          onChange={(e) => handleChange(e, [Number(e.target.value), value[1]])}
          className="w-1/2 border border-gray-300 rounded-md px-2 py-1"
        />
        <span>to</span>
        <input
          type="number"
          value={value[1]}
          onChange={(e) => handleChange(e, [value[0], Number(e.target.value)])}
          className="w-1/2 border border-gray-300 rounded-md px-2 py-1"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
