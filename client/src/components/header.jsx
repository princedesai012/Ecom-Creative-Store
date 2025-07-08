import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, ShoppingCart, Volume2, LogOut } from 'lucide-react';
import '../css/LandingPage.css';
import { logout, fetchUserProfile } from "../store/authslice";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  
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
        <a href="/" className="nav-brand">
          <Volume2 className="brand-icon" />
          <span className="brand-text">ZepCart</span>
        </a>

        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/products" className="nav-link">Products</a>
          <a href="#help" className="nav-link">Help Centre</a>
        </div>

        <div className="nav-icons">
          {isAuthenticated ? (
            <>
             
              <button className="nav-icon-btn" onClick={handleLogout}>
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <a href="/login" className="nav-icon-btn">
              <User size={20} />
            </a>
          )}

          <button className="nav-icon-btn cart-btn">
            <ShoppingCart size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
