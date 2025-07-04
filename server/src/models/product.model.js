import { mongoose } from 'mongoose';

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name

  description: { type: String, required: true }, // Full description of the product

  imageUrl: { type: String, required: true }, // URL to product image

  price: { type: Number, required: true }, // Product price

  category: { 
    type: String, 
    required: true, 
    enum: ['phone', 'laptop', 'tablet', 'accessory'] // Add your inbuilt options here
  }, // e.g., phone, laptop, etc.

  brand: { type: String, required: true }, // Product brand

  stock: { type: Number, required: true, min: 0 }, // Product stock

}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Export the model
export default mongoose.model('Product', productSchema);
