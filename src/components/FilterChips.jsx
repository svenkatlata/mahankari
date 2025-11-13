import { useState } from "react";

const FilterChips = () => {
  const [filters, setFilters] = useState(["25 inch - 28 inch", "Curved"]);

  const removeFilter = (filter) => {
    setFilters(filters.filter((item) => item !== filter));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <div
          key={filter}
          className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm cursor-default"
        >
          <button
            onClick={() => removeFilter(filter)}
            className="mr-1 text-gray-600 hover:text-black font-bold"
          >
            ×
          </button>
          <span>{filter}</span>
        </div>
      ))}
    </div>
  );
};

export default FilterChips;
