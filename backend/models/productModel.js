import mongoose from "mongoose";

// Define the product schema
// This schema defines the structure of the product documents in the MongoDB collection
// Each product will have a name, description, price, image, category, subCategory,
// sizes, bestSeller status, and date of creation
// The 'required' field ensures that these fields must be provided when creating a product
// The 'default' field for date will automatically set the current date when a product is created
// The 'image' & 'sizes' field is an array to allow multiple images for a product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestSeller: { type: Boolean },
  date: { type: Date, required: true, default: Date.now },
});

const productModel =
  mongoose.models.product || mongoose.model("Product", productSchema);

export default productModel;
