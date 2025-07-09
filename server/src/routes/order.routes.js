import express from 'express';
import { 
    createOrder, 
    getAllOrders,
    getOrderById, 
    updateOrderStatus, 
    deleteOrderById, 
    getOrdersByUserId ,
    cancelOrder
} from "../controllers/order.controller.js";
import { VerifyJWT, VerifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new order (requires authentication)
router.post('/', VerifyJWT, createOrder);

// Get all orders (admin only)
router.get('/', VerifyJWT, VerifyAdmin, getAllOrders);

// Get a specific order by ID (requires authentication)
router.get('/:id', VerifyJWT, getOrderById);

// Update the status of an order (admin only)
router.put('/:id', VerifyJWT, VerifyAdmin, updateOrderStatus);

// Delete an order by ID (admin only)
router.delete('/:id', VerifyJWT, VerifyAdmin, deleteOrderById);

// Get orders by user ID (requires authentication)
router.get('/user', VerifyJWT, getOrdersByUserId);

// Cancel an order by ID (requires authentication)
router.post('/cancel/:id', VerifyJWT, cancelOrder);

export default router;
