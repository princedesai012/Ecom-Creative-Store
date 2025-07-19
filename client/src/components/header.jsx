import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, fetchUserProfile } from '../store/authslice';
import { useNavigate, Link } from 'react-router-dom';
import '../css/LandingPage.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {  isAuthenticated } = useSelector((state) => state.auth);

 

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-brand" title="Home">
          <span className="brand-icon-text">🎧</span>
          <span className="brand-text">ZepCart</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link" title="Home">Home</Link>
          <Link to="/products" className="nav-link" title="Products">Products</Link>
          <Link to="/your-order" className="nav-link" title="Your Order">Your Order</Link>
        </div>

        <div className="nav-icons">
          
        { isAuthenticated ? (
            <>
              <button
                className="nav-icon-btn"
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
              >
                Logout
              </button>

              <button
                className="nav-icon-btn cart-btn"
                onClick={() => navigate('/cart')}
                title="Cart"
                aria-label="Cart"
              >
                Cart
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="nav-icon-btn"
              title="Login"
              aria-label="Login"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
