import express from 'express';
import { VerifyAdmin, VerifyJWT } from '../middleware/auth.middleware.js';
import Upload from "../middleware/multer.middleware.js";

import {
  Addproduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  addReview,
  getReviewsByProductId
} from '../controllers/product.controller.js';

const router = express.Router();

// ✅ Add a review to a product (User must be authenticated)
router.post('/review/:id', VerifyJWT, addReview);
router.get('/review/:id', getReviewsByProductId);

// ✅ Add a new product (Admin only)
router.post('/add', VerifyJWT, VerifyAdmin, Upload.single('imageurl'), Addproduct);

// ✅ Get all products with query, filter, and pagination
router.get('/', getAllProducts);

// ✅ Update a product by ID (Admin only)
router.put('/:id', VerifyJWT, VerifyAdmin, Upload.single('image'), updateProductById);

// ✅ Delete a product by ID (Admin only)
router.delete('/:id', VerifyJWT, VerifyAdmin, deleteProductById);

// ✅ Get a product by ID 
router.get('/:id', getProductById);

export default router;
