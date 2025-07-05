import Contact from "../models/contact.model.js";

// Create a new contact message (user must be authenticated)
export const createContactMessage = async (req, res) => {
    try {
        const { email, message } = req.body;
        const user = req.user ? req.user._id : null;

        if (!user || !email || !message) {
            return res.status(400).json({ message: "User, email, and message are required" });
        }

        const newMessage = await Contact.create({
            user,
            email,
            message,
        });

        res.status(201).json({ message: "Message sent successfully", contact: newMessage });
    } catch (error) {
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
};

// Get all contact messages (admin)
export const getAllContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find().populate('user', 'name email');
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch messages", error: error.message });
    }
};





// Delete contact message by ID
export const deleteContactMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Contact.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete message", error: error.message });
    }
};

// Get contact messages by user ID
export const getContactMessagesByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const messages = await Contact.find({ user: userId });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user's messages", error: error.message });
    }
};

