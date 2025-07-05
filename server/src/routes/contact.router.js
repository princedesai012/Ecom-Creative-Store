// routes/contact.routes.js

import express from 'express';
import { 
    createContactMessage,
    getAllContactMessages,
    deleteContactMessageById,
    getContactMessagesByUserId
} from '../controllers/contact.controller.js';

import { VerifyJWT, VerifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Route to create a new contact message (accessible to all authenticated users)
router.post('/', VerifyJWT, createContactMessage);

// Route to get all contact messages (admin only)
router.get('/', VerifyJWT, VerifyAdmin, getAllContactMessages);

// Route to get contact messages by user ID (user must be authenticated)
router.get('/user/:userId', VerifyJWT, getContactMessagesByUserId);

// Route to delete a specific contact message by ID (admin only)
router.delete('/:id', VerifyJWT, VerifyAdmin, deleteContactMessageById);

export default router;
