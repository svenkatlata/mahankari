import mongoose from "mongoose";
import "./product.model.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    images: [
      {
        secureUrl: { type: String, default: "" },
        publicId: { type: String, default: "" },
        isDefault: { type: Boolean, default: false },
      },
    ],
    parentCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      default: null,
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
