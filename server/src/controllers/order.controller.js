import  Order  from "../models/order.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import mongoose from 'mongoose';

// Create a new order with stock check



export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
console.log("Creating order for user:", userId);
    if (!address) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // 1. Find user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItems = [];

    // 2. Check stock and prepare order items
    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}`,
        });
      }

      // Add to order array
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
      });

      total += product.price * item.quantity;
    }

    // 3. Decrease stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // 4. Create new order
    const order = new Order({
      user: userId,
      products: orderItems,
      total,
      address,
      status: "pending",
    });

    const savedOrder = await order.save();

    // 5. Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order created successfully from cart",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order from cart:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
try {
    const orders = await Order.find().populate('user', 'name email').populate('products.product', 'name price');

    if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json(orders);

}
catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ message: "Internal server error" });

}


}
// Get orders by status (Admin only)


// Get order by ID
export const getOrderById = async (req, res) => {
try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('user', 'name email').populate('products.product', 'name price');

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);     

} catch (error) {
    console.error("Error fetching order by ID:", error);
    return res.status(500).json({ message: "Internal server error" });


}
}

// Update order status
export const updateOrderStatus = async (req, res) => {
try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true, runValidators: true }
    ).populate('user', 'name email').populate('products.product', 'name price');

    if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order status updated successfully", order: updatedOrder }); 

} catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error" });


}
}
// Delete order by ID
export const deleteOrderById = async (req, res) => {
try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });

} catch (error) {
    console.error("Error deleting order by ID:", error);
    return res.status(500).json({ message: "Internal server error" });


}
}   

// Get orders by user ID






export const getOrdersByUserId = async (req, res) => {
  try {
    // Log and validate req.user
    if (!req.user || !req.user._id) {
      console.error("Missing user ID in req.user:", req.user);
      return res.status(400).json({ message: "User ID not found in request" });
    }

    const userId = req.user._id;

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const orders = await Order.find({ user: userId })
      .populate('user', 'name email')
      .populate('products.product', 'name price');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json(orders);

  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Cancel order by user
export const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user._id;

        // Find the order and ensure it belongs to the user
        const order = await Order.findOne({ _id: orderId, user: userId });

        if (!order) {
            return res.status(404).json({ message: "Order not found or not authorized" });
        }

        // Only allow cancellation if order is not already cancelled or delivered
        if (order.status === "cancelled") {
            return res.status(400).json({ message: "Order is already cancelled" });
        }
        if (order.status === "delivered") {
            return res.status(400).json({ message: "Delivered orders cannot be cancelled" });
        }

        order.status = "cancelled";
        await order.save();

        return res.status(200).json({ message: "Order cancelled successfully", order });
    } catch (error) {
        console.error("Error cancelling order:", error);
        return res.status(500).json({ message: "Internal server error" , error : error.message });
    }
};
