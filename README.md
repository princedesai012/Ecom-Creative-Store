# ZEPCART

A full-stack web application for selling electronic products, featuring a modern responsive user interface, secure authentication, and robust backend APIs.

 ## FEATURES:

- View all products
- Product detail pages
- User registration and login (JWT authentication)
- Cart management
- Order placement
- Admin panel for product management (add, update, delete)
- Contact form
- Fully responsive design (mobile-first)

## SECURITY FEATURES:

- Password hashing with bcrypt
- JWT-based authentication
- OTP verification for user registration
- Secure file uploads with Cloudinary
- Auth middleware for protected routes
- Proper CORS configuration

## Tech Stack

- Frontend: React, React Router, Redux Toolkit
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT, bcrypt
- Others: Axios, Multer (for file uploads), Cloudinary (for image storage), OTP service.


## Installation 

- Clone the repository:      
      git clone <repo-url>
      cd <project-directory>
- Install client dependencies:  
      cd client
      npm install
- Install server dependencies:
      cd ../server
      npm install
- Set up environment variables for:
      MongoDB URI
      JWT secret keys
      Cloudinary credentials
      OTP service credentials
- Run the application:
  -For client 
      cd client
      npm start
  -For server
      cd ../server
      npm run dev 




