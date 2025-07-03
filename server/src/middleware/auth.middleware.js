import jwt from 'jsonwebtoken';

 export const VerifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify the token
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' }); // Token is invalid
    }
}

 export const VerifyAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed to the next middleware or route handler
    } else {
        return res.status(403).json({ message: 'Access denied, admin privileges required.' }); // User is not admin
    }
}

 