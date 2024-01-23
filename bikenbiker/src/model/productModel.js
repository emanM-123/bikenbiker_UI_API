import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: String,
  description: String,
  status: String,
  created_at: Date,
});

const Product = mongoose.model("Product", productSchema);

export { Product };
