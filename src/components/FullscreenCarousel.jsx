import { useState, useEffect } from 'react';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';

const FullscreenCarousel = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl z-50 hover:text-gray-300 transition"
      >
        <IoClose />
      </button>

      {/* Previous Button */}
      <button
        onClick={prevImage}
        className="absolute left-4 text-white text-4xl z-50 hover:text-gray-300 transition"
      >
        <IoChevronBack />
      </button>

      {/* Next Button */}
      <button
        onClick={nextImage}
        className="absolute right-4 text-white text-4xl z-50 hover:text-gray-300 transition"
      >
        <IoChevronForward />
      </button>

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Product ${currentIndex + 1}`}
        className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
      />
    </div>
  );
};

export default FullscreenCarousel;
