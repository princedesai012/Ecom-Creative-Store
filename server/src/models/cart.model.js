import mongoose from 'mongoose';

// Define the Cart schema (if you want to store cart in DB)
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Link to user who owns this cart
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to product
      },
      quantity: {
        type: Number,
        default: 1 // Quantity per item
      }
    }
  ]
}, { timestamps: true }); // Adds createdAt and updatedAt

// Export the model
export default mongoose.model('Cart', cartSchema);
