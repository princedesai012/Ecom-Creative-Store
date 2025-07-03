import {mongoose } from 'mongoose';

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name

  imageUrl: { type: String, required: true }, // URL to product image

  price: { type: Number, required: true }, // Product price

  category: { type: String, required: true }, // e.g., phone, laptop, etc.

  description: { type: String, required: true }, // Full description of the product

}, { timestamps: true }); // Automatically adds createdAt and updatedAt


// Export the model
export default model('Product', productSchema);
