import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

const ZoomCursor = ({ children }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative"
      onMouseMove={(e) =>
        setCursorPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
      }
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* The content over which the cursor works */}
      {children}

      {/* Custom zoom cursor */}
      {isHovering && (
        <div
          className="absolute pointer-events-none w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-[--color-primary] font-bold text-lg"
          style={{
            left: cursorPos.x - 20, // center the circle
            top: cursorPos.y - 20,
          }}
        >
          <IoAdd />
        </div>
      )}
    </div>
  );
};

export default ZoomCursor;
