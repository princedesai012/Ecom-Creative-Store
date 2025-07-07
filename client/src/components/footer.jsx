import React from 'react';
import { Volume2, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';
import './LandingPage.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="nav-brand">
              <Volume2 className="brand-icon" />
              <h3>ZepCart</h3>
            </a>
            <p>Innovative Electronics, Unmatched Experience.</p>
          </div>
          <div className="footer-links-container">
            <div className="footer-links">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>
            <div className="footer-links">
              <h4>Support</h4>
              <a href="#">Contact Us</a>
              <a href="#">FAQs</a>
              <a href="#">Help Centre</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ZepCart. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#" className="social-link"><Linkedin size={20} /></a>
            <a href="#" className="social-link"><Instagram size={20} /></a>
            <a href="#" className="social-link"><Youtube size={20} /></a>
            <a href="#" className="social-link"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
