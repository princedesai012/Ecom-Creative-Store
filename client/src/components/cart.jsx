import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, removeCartItem, clearCart as clearCartAPI } from "../api/cart.api";
import "../css/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartItems();
        setCartItems(response.items);
        console.log("Cart items fetched:", response.items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartAPI();
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // Simulate placing order
    console.log("Order placed:", cartItems);
    alert("Order placed successfully!");

    // Optional: clear cart
    handleClearCart();

    
   //OR to place order page with cartItems
   navigate("/place-order", { state: { cartItems } });
  };

  if (loading) return <p className="loader">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="cart-page">
      <h1 className="cart-title">🛒 Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-text">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product._id}>
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>₹{item.product.price * item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item.product._id)}>✖</button>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <button className="place-btn" onClick={handlePlaceOrder}>Place Order</button>
            <button className="clear-btn" onClick={handleClearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
