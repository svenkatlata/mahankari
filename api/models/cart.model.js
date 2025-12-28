import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },        
        quantity: { type: Number, required: true, default: 1 },
        addedAt: { type: Date, default: Date.now }
      }
    ],  
    totalPrice: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ["active", "ordered", "abandoned"], default: "active" },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;