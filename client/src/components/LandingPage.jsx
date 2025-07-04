// src/components/LandingPage.jsx

import React from 'react';
import { 
  User, 
  Search, 
  ShoppingCart, 
  Truck, 
  FileText, 
  RotateCcw, 
  Shield,
  Linkedin,
  Instagram,
  Mail,
  Youtube, 
  Facebook,
  Star,
  Volume2,
  Bluetooth,
  Battery,
  Zap,
  ChevronRight
} from 'lucide-react';
import './LandingPage.css';


const imageUrls = {
  mainHeadphones: 'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
  whiteHeadphones: 'https://plus.unsplash.com/premium_photo-1679864782376-bdbbb87d9027?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D.png',
  blueEarbuds: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D.png',
  blackSpeaker: 'https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.png',
  womanListening: 'https://images.unsplash.com/photo-1730973915515-e79273d90b7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxoZWFkcGhvbmVzfGVufDB8fDB8fHww',
};

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* -------------------- HEADER -------------------- */}
      <header className="header">
        <nav className="navbar">
          <a href="/" className="nav-brand">
            <Volume2 className="brand-icon" />
            <span className="brand-text">AudioTech</span>
          </a>
          <div className="nav-links">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#help" className="nav-link">Help Centre</a>
          </div>
          <div className="nav-icons">
            {/* --- THIS IS THE CHANGE --- */}
            <a href="/login" className="nav-icon-btn">
              <User size={20} />
            </a>
            {/* -------------------------- */}
            <button className="nav-icon-btn">
              <Search size={20} />
            </button>
            <button className="nav-icon-btn cart-btn">
              <ShoppingCart size={20} />
              <span className="cart-badge">2</span>
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* -------------------- HERO SECTION -------------------- */}
        <section id="home" className="hero-section">
            <div className="hero-grid">
                <div className="hero-text-content">
                    <p className="enjoy-text">Enjoy Every Single Beat</p>
                    <h1 className="main-headline">
                        <span className="headline-gradient">Immersive Sound</span>
                        <span className="headline-sub">Experience True Fidelity</span>
                    </h1>
                    <p className="hero-subtitle">Our new X-Series headphones deliver unparalleled audio clarity and deep, resonant bass in a sleek, comfortable design.</p>
                    
                    <div className="hero-buttons">
                        <button className="btn btn-primary">
                            <ShoppingCart size={18} />
                            Buy Now
                        </button>
                        <button className="btn btn-secondary">
                            Explore More
                        </button>
                    </div>

                    <div className="reviews-preview">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => <Star key={i} className="star-icon" />)}
                        </div>
                        <span className="review-text">4.8/5 from 2,847 reviews</span>
                    </div>
                </div>

                <div className="hero-product-showcase">
                    <div className="product-image-wrapper">
                        <img src={imageUrls.mainHeadphones} alt="Premium Wireless Headphones" className="hero-headphones-img"/>
                        <div className="product-glow"></div>
                    </div>
                </div>
            </div>

            <div className="features-bar">
                <div className="feature-item"><Battery size={20} /> 20hr Battery</div>
                <div className="feature-item"><Volume2 size={20} /> Noise Cancelling</div>
                <div className="feature-item"><Bluetooth size={20} /> Bluetooth 5.2</div>
                <div className="feature-item"><Zap size={20} /> Fast Charge</div>
                <div className="feature-item"><Shield size={20} /> 1-Year Warranty</div>
            </div>
        </section>


        {/* -------------------- PRODUCTS SECTION -------------------- */}
        <section id="products" className="products-section">
          <div className="section-header">
            <h2 className="section-title">Our Products</h2>
            <p className="section-subtitle">Discover our premium audio collection, crafted for pure sound.</p>
          </div>
          
          <div className="product-cards">
            {/* Card 1 */}
            <div className="product-card">
              <div className="product-image">
                <img src={imageUrls.whiteHeadphones} alt="Wireless Headphones" />
              </div>
              <div className="product-info">
                <h3>Wireless Headphones</h3>
                <p>Premium noise-cancelling technology.</p>
                <div className="product-price">₹9,999</div>
                 <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => <Star key={i} className="star-icon small" />)}
                    </div>
                    <span>(124)</span>
                </div>
                <button className="btn btn-card">View Details</button>
              </div>
            </div>
            {/* Card 2 */}
            <div className="product-card">
              <div className="product-image">
                <img src={imageUrls.blueEarbuds} alt="True Wireless Earbuds" />
              </div>
              <div className="product-info">
                <h3>True Wireless Earbuds</h3>
                <p>Crystal clear sound, all-day comfort.</p>
                <div className="product-price">₹4,999</div>
                 <div className="product-rating">
                    <div className="stars">
                        {[...Array(4)].map((_, i) => <Star key={i} className="star-icon small" />)}
                        <Star className="star-icon small empty" />
                    </div>
                    <span>(89)</span>
                </div>
                <button className="btn btn-card">View Details</button>
              </div>
            </div>
            {/* Card 3 */}
            <div className="product-card">
              <div className="product-image">
                <img src={imageUrls.blackSpeaker} alt="Wireless Speaker" />
              </div>
              <div className="product-info">
                <h3>360° Wireless Speaker</h3>
                <p>Room-filling surround sound experience.</p>
                <div className="product-price">₹7,999</div>
                 <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => <Star key={i} className="star-icon small" />)}
                    </div>
                    <span>(156)</span>
                </div>
                <button className="btn btn-card">View Details</button>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- SERVICES SECTION -------------------- */}
        <section className="services-section">
             <div className="section-header">
                <h2 className="section-title">Why Choose Us?</h2>
                <p className="section-subtitle">We provide services that guarantee your satisfaction.</p>
            </div>
            <div className="services-container">
                <div className="service-item">
                    <div className="service-icon-wrapper"><Truck size={32} /></div>
                    <h3>Free Shipping</h3>
                    <p>On all orders above ₹2,999, delivered right to your doorstep.</p>
                </div>
                <div className="service-item">
                    <div className="service-icon-wrapper"><FileText size={32} /></div>
                    <h3>GST Billing</h3>
                    <p>We provide proper GST invoicing for all your business needs.</p>
                </div>
                <div className="service-item">
                    <div className="service-icon-wrapper"><RotateCcw size={32} /></div>
                    <h3>7-Day Replacement</h3>
                    <p>Enjoy a hassle-free replacement policy for complete peace of mind.</p>
                </div>
            </div>
        </section>

        {/* -------------------- HELP CENTRE SECTION -------------------- */}
        <section id="help" className="help-section">
          <div className="help-content">
            <h2 className="section-title">Need Help?</h2>
            <p className="section-subtitle">Our support team is here to assist you with any questions.</p>
            <div className="help-buttons">
              <a href="#" className="help-btn"><span>Track Your Order</span> <ChevronRight /></a>
              <a href="#" className="help-btn"><span>Return Policy</span> <ChevronRight /></a>
              <a href="#" className="help-btn"><span>Service Centres</span> <ChevronRight /></a>
              <a href="#" className="help-btn"><span>Warranty Claims</span> <ChevronRight /></a>
            </div>
          </div>
          <div className="help-image-container">
              <img src={imageUrls.womanListening} alt="Customer enjoying music" />
          </div>
        </section>
      </main>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="footer">
        <div className="footer-content">
            <div className="footer-top">
                <div className="footer-brand">
                    <a href="/" className="nav-brand">
                        <Volume2 className="brand-icon" />
                        <h3>AudioTech</h3>
                    </a>
                    <p>Premium Sound, Unmatched Experience.</p>
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
                 <p>© {new Date().getFullYear()} AudioTech. All Rights Reserved.</p>
                <div className="social-icons">
                    <a href="#" className="social-link"><Linkedin size={20} /></a>
                    <a href="#" className="social-link"><Instagram size={20} /></a>
                    <a href="#" className="social-link"><Youtube size={20} /></a>
                    <a href="#" className="social-link"><Facebook size={20} /></a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;