import { useState } from "react";

const ToggleSwitch = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <label className="flex items-center cursor-pointer">
      {/* Toggle */}
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
        onClick={() => setEnabled(!enabled)}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>

      {/* Label Text */}
      <span className="ml-3 text-gray-700 text-sm font-medium">
        In stock only
      </span>
    </label>
  );
};

export default ToggleSwitch;
