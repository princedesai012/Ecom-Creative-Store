import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // Future: send cartItems to backend API to place order
    console.log("Order placed:", cartItems);

    alert("Order placed successfully!");

    clearCart();

    // Mock orderId since you have no backend yet
    const orderId = "12345";

    // Navigate to feedback page with orderId
    navigate(`/feedback/${orderId}`);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                <img src={item.product.imageUrl} alt={item.product.name} width="50" />
                <span>{item.product.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>Price: ₹{item.product.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
