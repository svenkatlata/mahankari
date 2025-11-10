import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../components/ProductsData';
import { IoRemove, IoAdd } from 'react-icons/io5';
import ZoomCursor from '../components/ZoomCursor';
import FullscreenCarousel from '../components/FullscreenCarousel';

const ProductDetails = () => {
  const { productInfo } = useParams();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectedProduct = products.find((item) => {
    const productTitle = item.product.split(' ').join('-').toLowerCase();
    const product = `${productTitle}-${item.id.toLowerCase()}`;
    return product === productInfo;
  });

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const images = selectedProduct.images.map((img) =>
    img.default ? img.default : img
  );
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
const [carouselIndex, setCarouselIndex] = useState(0);

const openCarousel = (index) => {
  setCarouselIndex(index);
  setIsCarouselOpen(true);
};

const closeCarousel = () => setIsCarouselOpen(false);


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16 flex flex-col items-center">
      {/* Main Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-md p-8 md:p-10">
        {/* LEFT SECTION — Images */}
        {/* Mobile Caraousel */}
        <div className="md:hidden relative w-full overflow-hidden cursor-zoom-in">
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index + 1}`}
                className="w-full shrink-0 aspect-3/4 object-cover rounded-lg border border-gray-200 snap-center shadow-sm"
              />
            ))}
          </div>
        </div>
        {/* Desktop Carousel */}
        <div className="hidden md:flex md:flex-col items-center">
          <ZoomCursor>
            <img
              src={selectedImage}
              alt="Product"
              onClick={() => openCarousel(images.indexOf(selectedImage))}
              className="aspect-3/4 w-full max-w-md rounded-lg border border-gray-200 object-cover shadow-sm cursor-none"
            />
          </ZoomCursor>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 md:grid md:grid-cols-4 gap-4 mt-6 flex-wrap justify-center">
            {images.map((img) => (
              <img
                key={img}
                src={img}
                onClick={() => setSelectedImage(img)}
                alt="Thumbnail"
                className={`w-24 h-32 rounded-lg object-cover border-2 cursor-pointer transition-transform duration-300 ${
                  selectedImage === img
                    ? 'border-(--color-primary) scale-105'
                    : 'border-gray-300 hover:border-(--color-primary)/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SECTION — Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Product Name */}
            <h2 className="text-2xl md:text-3xl font-semibold text-(--color-primary) mb-3">
              {selectedProduct.product}
            </h2>

            {/* Brief Description */}
            <div className="flex flex-wrap items-center gap-8 mb-6">
              <p className="text-base text-gray-700">{selectedProduct.excerpt}</p>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-bold text-(--color-primary)">
                ₹{selectedProduct.price}/-
              </span>
              <span className="text-gray-500 line-through text-sm">
                ₹{selectedProduct.mrp}/-
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-1">Inclusive of all taxes</p>
            <p className="text-sm text-gray-500 mb-8">
              *Free shipping available for this product
            </p>

            {/* Quantity */}
            <div className="flex flex-col gap-3 my-4">
              <span className="text-sm text-gray-700 font-medium">
                Quantity
              </span>
              <div className="flex w-fit items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-3 text-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  <IoRemove />
                </button>
                <span className="px-4 py-1 text-gray-800 font-medium select-none">
                  {selectedProduct.quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-3 text-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  <IoAdd />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 mb-10">
              <button className="w-full px-8 py-3 border-2 border-(--color-primary)/20 text-(--color-primary) font-medium rounded-md cursor-pointer hover:border-(--color-primary) transition-all duration-300">
                Add to Cart
              </button>
              <button className="w-full px-8 py-3 border-2 border-(--color-primary) bg-(--color-primary) text-white font-medium rounded-md cursor-pointer hover:bg-(--color-topbar) transition">
                Buy It Now
              </button>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* Product Info */}
            <div className="overflow-x-auto mt-4">
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-gray-200 rounded-lg text-sm text-gray-700">
                  <tbody>
                    {Object.entries(selectedProduct.productSpecs).map(([key, value], index) => (
                      <tr
                        key={index}
                        className={
                          index !== Object.entries(selectedProduct.productSpecs).length - 1
                            ? 'border-b'
                            : ''
                        }
                      >
                        <td className="px-4 py-2 font-medium w-1/3">{key}</td>
                        <td className="px-4 py-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Note Section */}
              <div className="mt-4 text-xs text-gray-500 space-y-1 italic">
                <p>
                  * Please note: Slight color variations may occur due to
                  photography lighting or screen settings.
                </p>
                <p>
                  {selectedProduct.disclaimer}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-(--color-primary) mb-2">
              Product Description
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Carousel */}
      {isCarouselOpen && (
  <FullscreenCarousel
    images={images}
    initialIndex={carouselIndex}
    onClose={closeCarousel}
  />
)}

    </div>
  );
};

export default ProductDetails;
