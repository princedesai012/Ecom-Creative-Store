import React, { useEffect, useState } from "react";
import "../css/YourOrderPage.css";
import { getOrdersByUserId, cancelOrder } from "../api/order.api";

const YourOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrdersByUserId();
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    setCancelingId(orderId);
    try {
      const response = await cancelOrder(orderId);
      if (response.success) {
        alert("Order cancelled successfully!");
        await fetchOrders();
      } else {
        alert(response.message || "Failed to cancel the order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Something went wrong while cancelling the order.");
    } finally {
      setCancelingId(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "status-pending";
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-unknown";
    }
  };

  if (loading) {
    return (
      <div className="your-orders-page">
        <h2 className="orders-title">📦 Your Orders</h2>
        <div className="orders-loading">Loading your order history...</div>
      </div>
    );
  }

  return (
    <div className="your-orders-page">
      <h2 className="orders-title">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <div>
                  <strong>Order ID:</strong> {order._id}
                </div>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status || "Unknown"}
                </span>
              </div>

              <div className="order-body">
                <div>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.total.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="order-items">
                  <strong>Items:</strong>
                  <ul className="order-item-list">
                    {order.products.map((item, index) => {
                      const product = item.product;
                      const image = product?.imageUrl || "https://via.placeholder.com/80";
                      return (
                        <li key={`${product?._id || index}`} className="order-item">
                          <img
                            src={image}
                            alt={product?.name || "Product Image"}
                            className="order-item-image"
                          />
                          <div>
                            <p>{product?.name || "Unknown"} × {item.quantity}</p>
                            <p>₹{product?.price?.toLocaleString("en-IN")}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {order.status?.toLowerCase() === "pending" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(order._id)}
                  disabled={cancelingId === order._id}
                >
                  {cancelingId === order._id ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourOrderPage;
