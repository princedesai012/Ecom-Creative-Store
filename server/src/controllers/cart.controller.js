import Cart from "../models/cart.model.js";

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { quantity } = req.body;
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }
      await cart.save();
    }

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item to cart", error: error.message });
  }
};


// Get cart items
export const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Failed to get cart items", error: error.message });
    }
};

// Update cart item quantity
export const updateCartItemQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const {  quantity } = req.body;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) return res.status(404).json({ message: "Item not found in cart" });

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: "Cart item quantity updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to update cart item", error: error.message });
    }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
       const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove item from cart", error: error.message });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Cart cleared", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to clear cart", error: error.message });
    }
};