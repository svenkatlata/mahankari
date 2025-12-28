import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    houseNo: { type: String, required: true },
    floor: { type: String, required: true },
    tower: { type: String, default: "" },
    building: { type: String, required: true },
    landmark: { type: String, default: "" },
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },

    // 📍 Google map location
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      placeId: { type: String }, // Optional: Google Place ID
      googleAddress: { type: String }, // Optional full address from Google
    },

    label: {
      type: String,
      enum: ["home", "office", "hotel", "other"],
      default: "home",
    },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
  },
  { timestamps: true }
);

// 👉 To make coordinates searchable by location (geo queries)
addressSchema.index({ location: "2dsphere" });

const Address = mongoose.model("Address", addressSchema);

export default Address;
