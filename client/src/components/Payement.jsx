import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/PaymentPage.css";
import { createOrder } from "../api/order.api";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { address, cartItems } = state || {};

  const [loading, setLoading] = useState(false);

  const total = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      setLoading(true);

      const orderData = {
        address,
        items: cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        total,
      };

      const response = await createOrder(orderData);

      if (response) {
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Payment or order creation failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1 className="title">💳 Checkout Summary</h1>

        <div className="address-box">
          <h3>Shipping Address</h3>
          <p>
            {address?.street}, {address?.city}, {address?.state} - {address?.zip},{" "}
            {address?.country}
          </p>
        </div>

        <div className="cart-summary">
          <h3>Items</h3>
          {cartItems?.map((item) => (
            <div className="item-row" key={item.product._id}>
              <span>{item.product.name}</span>
              <span>
                ₹{item.product.price} × {item.quantity}
              </span>
            </div>
          ))}

          <div className="total-row">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>
        </div>

        <button className="pay-btn" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : `Pay ₹${total}`}
        </button>
        {loading && <div className="loader"></div>}
      </div>
    </div>
  );
};

export default PaymentPage;
