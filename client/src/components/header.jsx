import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authslice';
import { useNavigate, Link } from 'react-router-dom';
import '../css/LandingPage.css';
import { fetchCurrentUser } from '../api/auth.api';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;
    const checkAuth = async () => {
      try {
        await fetchCurrentUser();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      setIsAuthenticated(false);
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
          <a href="/Your-order" className="nav-link" title="Your Order">Your Order</a>
        </div>

        <div className="nav-icons">
          {isAuthenticated ? (
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
            <Link to="/login" className="nav-icon-btn" title="Login" aria-label="Login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
