import User from "../models/user.model.js";
import { sendOtpEmail } from "../utils/sendotp.js";
import Otp  from "../models/otp.model.js";


// Register a new user
export  const registerUser = async (req, res) => {


    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({       
            email
        });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
           
        // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in DB with expiry of 10 minutes
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Send OTP to email
    await sendOtpEmail(email, otp);

    return res.status(200).json({
      message: 'OTP sent to email. Please verify to complete registration.',
    });
        
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
  
}
// verify OTP and complete registration

export const verifyOtpAndCompleteRegistration = async (req, res) => {
    try {
    const { name, email, password, otp } = req.body;

    // Find OTP record
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

  
    // Create the user
    await User.create({
      name,
      email,
      password,
      isAdmin: false,
    });

    // Remove used OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        // Find user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        // Check if password is correct
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate access and refresh tokens

        const accessToken = user.genrateAcessToken();
        const refreshToken = user.genrateRefreshToken();    

     const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
     const cookieOptions = {
      httpOnly: true,  
      secure: true, 
     }

     res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);
    console.log("Cookies set:", req.cookies); 

    return res.status(200).json({
      user: loggedInUser,
      accessToken,
      refreshToken,
      message: 'User logged in successfully'
    });

            
    
        
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server erroor"});
        
    }
} 

// Logout a user
export const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

          const cookieOptions = {
      httpOnly: true,  
      secure: true, 
     }

          res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
        return res.status(200).json({ message: "User logged out successfully" });
        
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}


// get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -refreshToken');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({message: "User profile fetched successfully", user });
        
    } catch (error) {
        
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password -refreshToken');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
        
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

// Update user password
export const updateUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current password and new password are required" });
        }

        // Find user by ID
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if current password is correct
        const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid current password" });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });
        
    } catch (error) {
        console.error("Error updating user password:", error);
        res.status(500).json({ message: "Internal server error", error : error.message });
        
    }
}






