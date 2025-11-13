import { useState } from "react";

const FabricFilter = ({ onFabricFilter }) => {
  const [selected, setSelected] = useState([]);

  const fabrics = [
    "Chennur Silk",
    "Kota Doriya",
    "MulMul Cotton",
    "120 Count Pure Cotton",
    "Bengal Soft Cotton",
    "Kota Cotton",
  ];

  const handleChange = (material) => {
    if (selected.includes(material)) {
      setSelected(selected.filter((item) => item !== material));
    } else {
      setSelected([...selected, material]);
      onFabricFilter([...selected, material]);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-gray-800 mb-3">Apparel Fabric</h3>

      <div className="space-y-2">
        {fabrics.map((fabric) => (
          <label
            key={fabric}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(fabric)}
              onChange={() => handleChange(fabric)}
              className="w-4 h-4 accent-black border-gray-400 rounded"
            />
            <span className="text-gray-700 text-sm">{fabric}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FabricFilter;
