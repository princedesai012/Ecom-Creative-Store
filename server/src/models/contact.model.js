import mongoose from 'mongoose';

// Define the Contact (feedback form) schema
const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User

  email: { type: String, required: true }, // Sender email

  message: { type: String, required: true }, // Message content

  date: { type: Date, default: Date.now } // Auto-fill current date

});

// Export the model
export default mongoose.model('Contact', contactSchema);
