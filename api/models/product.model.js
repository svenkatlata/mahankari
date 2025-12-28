import mongoose from "mongoose";
import "./category.model.js";
import "./variant.model.js";
import "./discount.model.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
    discountedPrice: {
      type: Number,
      min: 0,
    },
    images: [
      {
        secureUrl: { type: String, default: "" },
        publicId: { type: String, default: "" },
        isDefault: { type: Boolean, default: false },
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      default: null,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    specifications: {
      type: Map,
      of: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    variants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Variant",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
