import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';   
import {User} from "../models/user.model.js";

// configure passport to use Google OAuth 2.0

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,              // From .env
  clientSecret: process.env.CLIENT_SECRET,      // From .env
  callbackURL: '/api/auth/google/callback',   
}, async(accessToken, refreshToken , profile , done) => {
    try {
        // Check if user already exists in the database
        const gmail = profile.emails[0].value ; // Extract email from profile
        let user = await User.findOne(gmail);
        
        if (user) {
            // User already exists, return the user
            done(null, user);
        } else {
            // Create a new user in the database
            user = await User.create({
                name: profile.displayName, // Use display name from Google profile
                email: gmail,              // Use email from Google profile
                password: 'googleAuth',    // Placeholder password, not used for Google auth
                isAdmin: false              // Default to non-admin
            });
            done(null, user);
        }
    } catch (err) {
        return done(err, null);
    }
}));

// These two lines are required for session-based login
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});