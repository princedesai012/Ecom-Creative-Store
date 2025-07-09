import React, { useEffect, useState } from "react";
import "../css/YourOrderPage.css";
import { getAllOrders, cancelOrder } from "../api/order.api";

const YourOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
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

  if (loading) return <div className="orders-loading">Loading orders...</div>;

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
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.total}
                </p>
                <div className="order-items">
                  <strong>Items:</strong>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.productId}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {order.status?.toLowerCase() === "pending" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(order._id)}
                >
                  ❌ Cancel Order
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
