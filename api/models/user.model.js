import mongoose from "mongoose";
import "./address.model.js";
import "./cart.model.js";
import "./order.model.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatars: [
      {
        secureUrl: { type: String, default: "" },
        publicId: { type: String, default: "" },
        isDefault: { type: Boolean, default: false },
      },
    ],
    mobile: { type: Number, default: null },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    addresses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
      },
    ],
    cart: [{ type: mongoose.Schema.ObjectId, ref: "Cart" }],
    orders: [{ type: mongoose.Schema.ObjectId, ref: "Order" }],
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
