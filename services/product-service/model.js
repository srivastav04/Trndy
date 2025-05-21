import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  tagline: String,
  category: String,
  brand: String,
  description: String,
  images: [String],
  rating: Number,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
