import { useState, useEffect } from "react";

const FilterChips = ({ selectedFabrics }) => {
  const [filters, setFilters] = useState([...selectedFabrics]);

  useEffect(() => {
    setFilters([...selectedFabrics]);
  }, [selectedFabrics]);

  const removeFilter = (filter) => {
    const filteredFilters = filters.filter((item) => item !== filter);
    setFilters(filteredFilters);
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
