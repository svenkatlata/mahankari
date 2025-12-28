import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true }, // Price at the time of order
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
      required: true,
    },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "razorpay"],
      required: true,
    },
    paymentDetails: {
      name: { type: String }, // Razorpay / Stripe / PayPal etc.
      orderId: { type: String }, // Gateway order ID
      paymentId: { type: String }, // Gateway payment ID
      signature: { type: String }, // For payment verification
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    refundDetails: {
      requested: { type: Boolean, default: false },
      requestedAt: Date,
      refundId: { type: String },
      amount: { type: Number },
      processed: { type: Boolean, default: false },
      processedAt: Date,
      reason: { type: String },
      status: { type: String, enum: ["initiated", "processed", "failed"] },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
