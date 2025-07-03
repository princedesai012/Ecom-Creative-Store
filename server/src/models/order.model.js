import mongoose from 'mongoose';

// Define the Order schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // References the Product model
      },
      quantity: {
        type: Number,
        default: 1 // Default quantity is 1
      }
    }
  ],
  total: { type: Number, required: true }, // Total order amount

  status: { type: String, default: 'pending' }, // Order status: pending, completed, shipped, etc.


  date: { type: Date, default: Date.now } // Order placement date
  
}, { timestamps: true }); // Adds createdAt and updatedAt

// Export the model
export default  mongoose.model('Order', orderSchema);
