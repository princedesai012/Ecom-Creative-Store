import React, { useEffect, useState } from 'react';
import '../css/AdminPanel.css';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrderStatus } from '../api/order.api';
import { getAllProducts, deleteProductById } from '../api/products.api';

function AdminPanel() {
    const [view, setView] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    // Close sidebar when view changes (useful for mobile)
    useEffect(() => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    }, [view]); // eslint-disable-line react-hooks/exhaustive-deps


    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            if (response && Array.isArray(response)) setOrders(response);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            if (response && Array.isArray(response.products)) {
                setProducts(response.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (!confirm) return;

        try {
            await deleteProductById(id);
            alert("Product deleted successfully!");
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    const renderAddress = (address) => {
        if (!address) return 'N/A';
        const { street, city, state, zip, country } = address;
        return `${street}, ${city}, ${state} - ${zip}, ${country}`;
    };

    const handleAddProduct = () => navigate('/admin/add-product');
    const handleEditProduct = (id) => navigate(`/admin/edit-product/${id}`);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, { status: newStatus });
            console.log(`Order ${orderId} status updated to ${newStatus}`); // Updated console.log
            fetchOrders(); // Refresh orders
        } catch (error) {
            alert('Failed to update order status.');
            console.error(error);
        }
    };

    // Toggle sidebar function
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="admin-container">
            {/* Hamburger button for mobile */}
            <button className="hamburger-menu" onClick={toggleSidebar} aria-label="Toggle navigation">
                ☰
            </button>

            {/* Sidebar Overlay (visible when sidebar is open on mobile) */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2>Admin Dashboard</h2> {/* Added a title for the sidebar */}
                <button onClick={() => setView('orders')} className={view === 'orders' ? 'active' : ''}>
                    Orders
                </button>
                <button onClick={() => setView('products')} className={view === 'products' ? 'active' : ''}>
                    Products
                </button>
                <button className="add-product-btn" onClick={handleAddProduct}>+ Add Product</button>
            </aside>

            <main className="main-content">
                <h1>Admin Panel</h1>

                {view === 'orders' ? (
                    <>
                        <h2>Orders Placed by Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Address</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    {/* Removed Action column for orders, as per previous conversation */}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.flatMap((order) =>
                                        order.products.map((item, i) => (
                                            <tr key={`${order._id}-${i}`}>
                                                <td>{order._id}</td>
                                                <td>{order.user?.name || 'Unknown'}</td>
                                                <td>{renderAddress(order.address)}</td>
                                                <td>{item.product?.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>₹{item.product?.price * item.quantity}</td>
                                                <td>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        className={`status-select status-${order.status.toLowerCase().replace(/\s/g, '-')}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                ) : (
                                    <tr><td colSpan="7">No orders found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        <h2>All Products</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Image</th> {/* Added Image column */}
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <tr key={p._id}>
                                            <td>{p._id}</td>
                                            <td>
                                                {p.images && p.images.length > 0 && (
                                                    <img src={p.images[0]} alt={p.name} className="product-thumb" />
                                                )}
                                            </td>
                                            <td>{p.name}</td>
                                            <td>{p.brand}</td>
                                            <td>{p.category}</td>
                                            <td>₹{p.price}</td>
                                            <td>{p.stock}</td>
                                            <td>
                                                <button onClick={() => handleEditProduct(p._id)} className="action-button edit-button">Edit</button>{" "}
                                                <button onClick={() => handleDeleteProduct(p._id)} className="action-button delete-button">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="8">No products found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            </main>
        </div>
    );
}

export default AdminPanel;