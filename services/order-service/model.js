import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  tagline: { type: String },
  category: { type: String },
  brand: { type: String },
  description: { type: String },
  images: [{ type: String }],
  rating: { type: Number },
  price: { type: Number },
  quantity: { type: Number, required: true },
  date: { type: String },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orders: {
    type: [Array], // array of item objects
    default: [],
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
