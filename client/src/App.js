// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProductsPage from './components/ProductPage';
import Header from "./components/header";
import Footer from "./components/footer";
import AdminPanel from './admin/AdminPanel';

import AdminLogin from './admin/AdminLogin';
import ProductDetailPage from './components/ProductDetailPage'; 
import AddProduct from './admin/AddProduct';


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

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path='/admin/panel' element={<AdminPanel/>}/>
          <Route path='/admin/add-product' element={<AddProduct/>}/>
        
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>


        <Footer /> {/* Common Footer for all routes */}
      </div>
    </Router>
  );
}

export default App;
