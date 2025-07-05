import express from 'express';
import {
  addItemToCart,
  getCartItems,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart
} from '../controllers/cart.controller.js';

import { VerifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

//  Add item to cart (expects productId in params, quantity in body)
router.post('/add/:productId', VerifyJWT, addItemToCart);

//  Get all items in the cart
router.get('/', VerifyJWT, getCartItems);

//  Update item quantity (expects productId in params, new quantity in body)
router.put('/update/:productId', VerifyJWT, updateCartItemQuantity);

//  Remove a specific item from the cart (expects productId in params)
router.delete('/remove/:productId', VerifyJWT, removeItemFromCart);

//  Clear the entire cart
router.delete('/clear', VerifyJWT, clearCart);

export default router;
