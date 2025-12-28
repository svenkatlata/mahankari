import mongoose from "mongoose";
import "./product.model.js";

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    additionalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: [
      {
        secureUrl: { type: String, default: "" },
        publicId: { type: String, default: "" },
        isDefault: { type: Boolean, default: false },
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;
