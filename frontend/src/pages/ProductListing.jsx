import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ToggleSwitch from "../components/ToggleSwitch";
import ProductCard from "../components/ProductCard";
import RangeSlider from "../components/RangeSlider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import * as allproductsData from "../components/ProductsData";
import PageNotFound from "./PageNotFound";

const ProductListing = () => {
  const { productsListing } = useParams();

  let categoryurl = "";
  productsListing.split("-").forEach((categoryword, idx) => {
    if (idx === 0) {
      categoryurl = categoryword;
    } else {
      var firstChar = categoryword.charAt(0).toUpperCase();
      categoryurl += firstChar + categoryword.slice(1);
    }
  });

  const [inStockOnly, setInStockOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(
    allproductsData[categoryurl]
  );

  useEffect(() => {
    setFilteredProducts(allproductsData[categoryurl]);
  }, [productsListing]);

  const [sortby, setSortBy] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const onHandleInStock = (isInStockOnly) => {
    setInStockOnly(isInStockOnly);
    const inStockProducts = isInStockOnly
      ? allproductsData[categoryurl].filter((product) => product.quantity > 0)
      : allproductsData[categoryurl];

    setFilteredProducts(inStockProducts);
  };

  return filteredProducts && filteredProducts.length ? (
    <div className="min-h-screen px-6 py-16 flex flex-col items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ---------- Sidebar Filters ---------- */}
        <aside className="bg-white p-5 h-fit border border-transparent border-r-gray-300">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Availability */}
          <div className="mb-6">
            <button className="flex justify-between w-full text-left font-medium text-gray-700 mb-2">
              <span>Availability</span>
            </button>
            <div className="flex items-center gap-2">
              <ToggleSwitch handleInStock={onHandleInStock} />
            </div>
          </div>

          {/* Price Range slider */}
          <RangeSlider />
        </aside>

        {/* ---------- Product Grid ---------- */}
        <main className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-700">
              {filteredProducts?.length} Products
            </h2>
            <FormControl
              variant="outlined"
              size="small"
              sx={{
                minWidth: 160,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#481133",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#481133",
                  },
                },
              }}
            >
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortby}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value={"featured"}>Featured</MenuItem>
                <MenuItem value={"bestselling"}>Best Selling</MenuItem>
                <MenuItem value={"lowToHigh"}>Price: Low to High</MenuItem>
                <MenuItem value={"hightolow"}>Price: High to Low</MenuItem>
                <MenuItem value={"newtoold"}>Date: New to Old</MenuItem>
                <MenuItem value={"oldtonew"}>Date: Old to New</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};

export default ProductListing;
