import express from 'express';
import {VerifyJWT} from '../middleware/auth.middleware.js';

import { registerUser,loginUser,verifyOtpAndCompleteRegistration,logoutUser,updateUserPassword,updateUserProfile,fetchCurrentUser } from '../controllers/user.controller.js';


 const  router = express.Router();

// User registration route
router.post('/register', registerUser);
// User login route
router.post('/login', loginUser);
// User OTP verification and registration completion route  
router.post('/verify-otp', verifyOtpAndCompleteRegistration);
// User logout route
router.post('/logout', VerifyJWT, logoutUser);
// Update user password route
router.put('/update-password', VerifyJWT,updateUserPassword);
// Update user profile route
router.put('/update-profile', VerifyJWT,updateUserProfile);
// Fetch current user profile route
router.get('/profile', VerifyJWT, fetchCurrentUser);

 export default router;