import React from 'react';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

            {/* Public Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/*  Protected Admin Routes */}
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
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
