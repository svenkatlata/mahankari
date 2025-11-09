import { useState } from "react";
import { useParams } from "react-router-dom";

import { newArrivals } from "../components/ProductsData";

const ProductDetails = () => {
  const { productInfo } = useParams();
  const selectedProduct = newArrivals.find((item) => {
    const productTitle = item.product.split(" ").join("-").toLowerCase();
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-sm p-6">
        {/* Left: Product Images */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full max-w-md rounded-xl border border-gray-200 object-cover"
          />

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {images.map((img) => (
              <img
                key={img}
                src={img}
                onClick={() => setSelectedImage(img)}
                alt="Thumbnail"
                className={`w-20 h-20 rounded-md object-cover border-2 cursor-pointer transition ${
                  selectedImage === img
                    ? "border-black scale-105"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-3">
              Kalamkari Dyeing Premium Chennur Silk Saree with Hand Block Print
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Experience elegance with our premium hand block printed Chennur
              silk saree, featuring intricate Kalamkari dyeing artistry.
            </p>

            <div className="text-3xl font-bold text-gray-800 mb-2">₹ 3,999</div>
            <p className="text-sm text-gray-500 mb-6">Inclusive of all taxes</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button className="w-full sm:w-auto px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
                Add to Cart
              </button>
              <button className="w-full sm:w-auto px-8 py-3 border border-black rounded-md hover:bg-gray-100 transition">
                Buy It Now
              </button>
            </div>

            <hr className="my-4" />

            {/* Product Info */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Fabric:</span>
                <span className="font-medium">Chennur Silk</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Design:</span>
                <span className="font-medium">Hand Block Print</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Pattern:</span>
                <span className="font-medium">Kalamkari Dyeing</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Color:</span>
                <span className="font-medium">Rust Red with Gold Border</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-2">Product Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This premium Chennur silk saree showcases traditional Indian
              craftsmanship through vibrant Kalamkari dyeing and hand block
              prints. Perfect for festive occasions, weddings, and celebrations.
              Comes with a matching blouse piece.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
