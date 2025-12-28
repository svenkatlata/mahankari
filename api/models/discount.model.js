import mongoose from "mongoose";
import "./product.model.js";

const discountSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["percentage", "fixed", "buy_x_get_y"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    targetProducts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    percentage: {
      type: Number,
      required: function () {
        return this.type === "percentage";
      },
      min: 0,
    },
    discountAmount: {
      type: Number,
      required: function () {
        return this.type === "fixed";
      },
      min: 0,
    },
    buyXgetY: {
      buyQty: {
        type: Number,
        min: 1,
        required: function () {
          return this.type === "buy_x_get_y";
        },
      },
      getQty: {
        type: Number,
        min: 1,
        required: function () {
          return this.type === "buy_x_get_y";
        },
      },
      freeItems: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          default: [],
        },
      ],
    },
  },
  { timestamps: true }
);

discountSchema.pre("save", function (next) {
  if (this.startDate >= this.endDate) {
    return next(new Error("Discount endDate must be after startDate"));
  }
  next();
});

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
