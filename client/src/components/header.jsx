import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Volume2 } from 'lucide-react';
import '../css/LandingPage.css';
import { logout, fetchUserProfile } from "../store/authslice";
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-brand" title="Home">
          <Volume2 className="brand-icon" />
          <span className="brand-text">ZepCart</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link" title="Home"> Home</Link>
          <Link to="/products" className="nav-link" title="Products"> Products</Link>
          <a href="/Your-order" className="nav-link" title="Your Order"> Your Order</a>
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
                🔓
              </button>

              <button
                className="nav-icon-btn cart-btn"
                onClick={() => navigate('/cart')}
                title="Cart"
                aria-label="Cart"
              >
                🛒
              </button>

             
            </>
          ) : (
            <Link to="/login" className="nav-icon-btn" title="Login" aria-label="Login">
              👤
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
