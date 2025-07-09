import React, { useEffect, useState } from "react";
import "../css/YourOrderPage.css";
import { getAllOrders, cancelOrder } from "../api/order.api";

const YourOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- DUMMY DATA ---
  const dummyOrders = [
    {
      _id: "665b1c4e9f1a2b3c4d5e6f7g",
      createdAt: "2024-06-01T10:30:00.000Z",
      status: "Delivered",
      total: 14998,
      items: [
        { productId: "prod1", name: "AuraMax Headphones", quantity: 1 },
        { productId: "prod2", name: "NanoBuds Pro", quantity: 1 },
      ],
    },
    {
      _id: "665b1c5a9f1a2b3c4d5e6f7h",
      createdAt: "2024-05-28T15:00:00.000Z",
      status: "Pending",
      total: 7999,
      items: [
        { productId: "prod3", name: "SonicSphere 360", quantity: 1 },
      ],
    },
    {
      _id: "665b1c6f9f1a2b3c4d5e6f7i",
      createdAt: "2024-05-25T09:15:00.000Z",
      status: "Cancelled",
      total: 12999,
      items: [
        { productId: "prod4", name: "Ember Gaming Headset", quantity: 1 },
      ],
    },
    {
        _id: "665b1c8a9f1a2b3c4d5e6f7j",
        createdAt: "2024-05-20T18:45:00.000Z",
        status: "Delivered",
        total: 15999,
        items: [
          { productId: "prod5", name: "Nebula Over-Ear", quantity: 1 },
        ],
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // --- Simulate an API call with a delay ---
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(dummyOrders);
        
        // --- This would be your real API call ---
        // const response = await getAllOrders();
        // setOrders(response.data.orders || []);

      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    // In a real app, you would call the API first
    // await cancelOrder(orderId); 
    
    // For now, we just update the state
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
                        <strong>Total:</strong> ₹{order.total.toLocaleString('en-IN')}
                    </p>
                </div>
                <div className="order-items">
                  <strong>Items:</strong>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={`${item.productId}-${index}`}>
                        {item.name}  ×  {item.quantity}
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