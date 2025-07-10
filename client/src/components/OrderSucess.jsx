import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <div className="order-card">
        <div className="emoji">🎉</div>
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your order. Your items will be shipped shortly.
        </p>

        <div className="success-buttons">
          <button onClick={() => navigate("/")} className="btn btn-shop">
            Continue Shopping
          </button>
          <button onClick={() => navigate("/orders")} className="btn btn-orders">
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
