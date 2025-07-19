import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProductsPage from './components/ProductPage';
import Header from './components/header';
import Footer from './components/footer';
import AdminPanel from './admin/AdminPanel';
import AdminLogin from './admin/AdminLogin';
import ProductDetailPage from './components/ProductDetailPage';
import AddProduct from './admin/AddProduct';
import RequireAuth from './components/CheckAuth';
import Cart from './components/cart'; 
import { CartProvider } from './context/CartContext'; 
import FeedbackPage from './components/FeedbackPage';
import PlaceOrder from './components/PlaceOrder';
import PaymentPage from './components/Payement';
import OrderSuccess from './components/OrderSucess';
import YourOrderPage from './components/YourOrderPage';
import EditProduct from './admin/EditProduct';

function App() {


  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/panel"
              element={
                <RequireAuth>
                  <AdminPanel />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/add-product"
              element={
                <RequireAuth>
                  <AddProduct />
                </RequireAuth>
              }
            />
            <Route 
              path='/admin/edit-product/:id'
              element={
                <RequireAuth>
                  <EditProduct/>
                </RequireAuth>
              }
            />
            <Route 
              path='/place-order'
              element={
                <RequireAuth>
                  <PlaceOrder/>
                </RequireAuth>
              }
            />
            <Route
              path='/payment' 
              element={
                <RequireAuth>
                  <PaymentPage/>
                </RequireAuth>
              }
            />
            <Route path="/cart" element={ <RequireAuth><Cart /> </RequireAuth>} />
            <Route 
              path="/order-success"
              element={
                <RequireAuth>
                  <OrderSuccess/>
                </RequireAuth>
              }
            />
            <Route 
              path='/Your-order'
              element={
                <RequireAuth>
                  <YourOrderPage/>
                </RequireAuth>
              }
            />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;