import mongoose from 'mongoose';

// Define the Order schema
const orderSchema = new mongoose.Schema({
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  address: {
    street:  { type: String, required: true },
    city:    { type: String, required: true },
    state:   { type: String, required: true },
    zip:     { type: String, required: true },
    country: { type: String, required: true }
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Export the model
export default mongoose.model('Order', orderSchema);
