import React, { useEffect, useState } from "react";
import "../css/YourOrderPage.css";
import { getOrdersByUserId, cancelOrder } from "../api/order.api";

const YourOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrdersByUserId();
        setOrders(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    // Call API to cancel the order (optional)
    // await cancelOrder(orderId);

    // Update UI
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
    console.log(`Order ${orderId} cancelled (frontend only).`);
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
                  <ul>
                    {order.products.map((item, index) => (
                      <li key={`${item.product?._id || index}`}>
                        {item.product?.name || "Unknown"} × {item.quantity}
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
