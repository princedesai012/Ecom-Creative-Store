ZEPCART
A full-stack web application for selling electronic products, featuring a modern responsive user interface, secure authentication, and robust backend APIs.

FEATURES:
View all products
Product detail pages
User registration and login (JWT authentication)
Cart management
Order placement
Admin panel for product management (add, update, delete)
Contact form
Fully responsive design (mobile-first)

SECURITY FEATURES:
Password hashing with bcrypt
JWT-based authentication
OTP verification for user registration
Secure file uploads with Cloudinary
Auth middleware for protected routes
Proper CORS configuration

SETUP:
Prerequisites
 Node.js (v16+)
 MongoDB (local or Atlas)

Installation Steps

1.Clone the repository:      
      git clone <repo-url>
      cd <project-directory>
2.Install client dependencies:  
      cd client
      npm install
3.Install server dependencies:
      cd ../server
      npm install
4.Set up environment variables for:
      MongoDB URI
      JWT secret keys
      Cloudinary credentials
      OTP service credentials
5.Run the application:
  -For client 
      cd client
      npm start

  -For server
      cd ../server
      npm run dev



