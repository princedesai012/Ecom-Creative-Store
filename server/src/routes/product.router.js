import express from 'express';
import { VerifyAdmin } from '../middleware/auth.middleware.js';
import Upload from "../middleware/multer.middleware.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

import {
  Addproduct,
  getAllProducts,
  getProductById,
  updateProductById,
deleteProductById,
addReview
} from '../controllers/product.controller.js';

const router = express.Router();

// Add a new product (Admin only)
router.post('/add', VerifyJWT, VerifyAdmin, Upload.single('imageurl'), Addproduct);

// Get all products with query, filter, and pagination
router.get('/', getAllProducts);

// Get a product by ID
router.get('/:id', getProductById);

// Update a product by ID (Admin only)
router.put('/:id', VerifyJWT, VerifyAdmin, Upload.single('image'), updateProductById);
// Delete a product by ID (Admin only)
router.delete('/:id', VerifyJWT, VerifyAdmin, deleteProductById);

// Add a review to a product (User must be authenticated)
router.post('/:id/review', VerifyJWT, addReview);

export default router;






  