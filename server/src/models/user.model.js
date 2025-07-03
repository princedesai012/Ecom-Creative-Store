import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name

  email: { type: String, unique: true, required: true }, // Unique email

  password: { type: String, required: true }, // Hashed password

  isAdmin: { type: Boolean, default: false }, // Admin flag (true for admin user)

}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically



// hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});
// compare the password with the hashed password in the database
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};


//generate JWT token for the user

userSchema.methods.genrateAcessToken = function() {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

}

//  genrate refresh token for the user
userSchema.methods.genrateRefreshToken = function() {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });

}


// Export the model
const User = mongoose.model('User', userSchema);
export default User;
