import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allProducts } from "../components/ProductsData";
import { IoRemove, IoAdd, IoHeart, IoHeartOutline } from "react-icons/io5";
import ZoomCursor from "../components/ZoomCursor";
import FullscreenCarousel from "../components/FullscreenCarousel";
import PageNotFound from "./PageNotFound";

const ProductDetails = () => {
  const { productInfo } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const selectedProduct = allProducts.find((item) => {
    const productTitle = item.product.split(" ").join("-").toLowerCase();
    const product = `${productTitle}-${item.id.toLowerCase()}`;
    return product === productInfo;
  });

  const images = selectedProduct?.images.map((img) =>
    img.default ? img.default : img
  );
  const [selectedImage, setSelectedImage] = useState(
    (images && images[0]) || []
  );

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openCarousel = (index) => {
    setCarouselIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => setIsCarouselOpen(false);

  const maxQty = selectedProduct?.quantity + 2;

  return selectedProduct ? (
    <div className="min-h-screen px-6 py-16 flex flex-col items-center">
      {/* Main Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-10 min-h-[80vh]">
        {/* LEFT SECTION — Images */}
        {/* Mobile Caraousel */}
        <div className="md:hidden relative w-full overflow-hidden cursor-zoom-in">
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
            {images &&
              images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full shrink-0 aspect-3/4 object-cover border border-gray-200 snap-center shadow-sm"
                />
              ))}
          </div>
        </div>
        {/* Desktop Carousel */}
        <div className="hidden md:flex md:flex-col items-center sticky top-28 self-start h-fit">
          <ZoomCursor>
            <img
              src={selectedImage}
              alt="Product"
              onClick={() =>
                openCarousel(images && images.indexOf(selectedImage))
              }
              className="aspect-3/4 w-full max-w-md border border-gray-200 object-cover shadow-sm cursor-none"
            />
          </ZoomCursor>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 md:grid md:grid-cols-4 gap-4 mt-6 flex-wrap justify-center">
            {images &&
              images.map((img) => (
                <img
                  key={img}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  alt="Thumbnail"
                  className={`w-24 h-32 object-cover border-2 cursor-pointer transition-transform duration-300 ${
                    selectedImage === img
                      ? "border-(--color-primary) scale-105"
                      : "border-gray-300 hover:border-(--color-primary)/60"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* RIGHT SECTION — Scollable Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Product Name + Wishlist */}
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-2xl md:text-3xl font-semibold text-(--color-primary)">
                {selectedProduct.product}
              </h2>
              {/* Wishlist Icon with hover fill */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="relative group text-gray-400 hover:text-(--color-primary) transition-colors mt-1"
                title={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
              >
                {/* Outline Heart (default) */}
                <IoHeartOutline
                  className={`text-2xl md:text-3xl transition-opacity duration-200 ${
                    isWishlisted
                      ? "opacity-0"
                      : "opacity-100 group-hover:opacity-0"
                  }`}
                />

                {/* Filled Heart (on hover or active) */}
                <IoHeart
                  className={`text-2xl md:text-3xl absolute top-0 left-0 transition-opacity duration-200 ${
                    isWishlisted
                      ? "opacity-100 text-(--color-primary)"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            </div>

            {/* Brief Description */}
            <div className="flex flex-wrap items-center gap-8 mb-6">
              <p className="text-base text-gray-700">
                {selectedProduct.excerpt}
              </p>
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
              *Free shipping is available for this product.
            </p>

            {!selectedProduct.isSoldOut ? (
              <div className="flex flex-col gap-4">
                {/* Quantity */}
                <span className="text-sm text-gray-700 font-medium">
                  Quantity
                </span>
                <div className="flex w-fit items-center border border-(--color-primary) overflow-hidden">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className={`p-3 text-lg text-gray-700 transition 
                  ${
                    quantity === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                  >
                    <IoRemove />
                  </button>
                  <span className="px-4 py-1 text-gray-800 font-medium select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.min(prev + 1, maxQty))
                    }
                    className={`p-3 text-lg text-gray-700 transition 
                  ${
                    quantity === maxQty
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                  >
                    <IoAdd />
                  </button>
                </div>
                <div
                  className={`text-red-500 ${
                    quantity === maxQty ? "block" : "hidden"
                  }`}
                >
                  Sorry, we have limited quantity available for this item!
                </div>

                {/* Buttons */}
                {/* Double border: outer shows on hover, inner always visible */}
                <div className="inline-block group">
                  {/* wrapper = outer border area (keeps space) */}
                  <div className="border-2 border-transparent group-hover:border-(--color-primary) transition-colors duration-200">
                    <button
                      className="w-full h-12 px-6 bg-white border border-(--color-primary) text-(--color-primary) font-medium cursor-pointer transition-transform duration-150"
                      // keep height fixed so nothing moves
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="inline-block group">
                  <div className="border-2 border-transparent group-hover:border-(--color-primary) transition-colors duration-200">
                    <button className="w-full h-12 px-6 bg-(--color-primary) border border-(--color-primary) text-white font-medium cursor-pointer transition-transform duration-150">
                      Buy It Now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start border border-gray-300 p-6 mb-10">
                {/* Sold Out Label */}
                <div className="w-full border border-gray-300 text-center py-2 mb-4">
                  <span className="uppercase text-gray-800 tracking-widest text-sm font-medium">
                    SOLD OUT
                  </span>
                </div>

                {/* Out of Stock Info */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Out Of Stock!
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  We will notify you when this product becomes available.
                </p>

                {/* Email Input + Notify Me Button */}
                <div className="flex w-full max-w-sm">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
                  />
                  <button className="bg-black text-white px-5 py-2 text-sm font-medium tracking-widest">
                    NOTIFY ME
                  </button>
                </div>
              </div>
            )}

            <hr className="border-gray-200 my-8" />

            {/* Product Info */}
            <div className="overflow-x-auto mt-4">
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                  <tbody>
                    {Object.entries(selectedProduct.productSpecs).map(
                      ([key, value], index) => (
                        <tr
                          key={index}
                          className={
                            index !==
                            Object.entries(selectedProduct.productSpecs)
                              .length -
                              1
                              ? "border-b"
                              : ""
                          }
                        >
                          <td className="px-4 py-2 font-medium w-1/3">{key}</td>
                          <td className="px-4 py-2">{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Note Section */}
              <div className="mt-4 text-xs text-gray-500 space-y-1 italic">
                <p>
                  * Please note: Slight color variations may occur due to
                  photography lighting or screen settings.
                </p>
                <p>{selectedProduct.disclaimer}</p>
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
      {isCarouselOpen && images && (
        <FullscreenCarousel
          images={images}
          initialIndex={carouselIndex}
          onClose={closeCarousel}
        />
      )}
    </div>
  ) : (
    <PageNotFound />
  );
};

export default ProductDetails;
