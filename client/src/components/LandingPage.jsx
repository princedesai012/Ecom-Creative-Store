import React from 'react';
import {
  ShoppingCart,
  Star,
  Battery,
  Zap,
  Bluetooth,
  Shield,
  FileText,
  Truck
} from 'lucide-react';
import "../css/LandingPage.css"; 

const imageUrls = {
  abstractTech: 'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60',
  mainProduct: 'https://t4.ftcdn.net/jpg/14/08/64/83/240_F_1408648340_bQHXLioid5yCVVhEX9TkNRUSHdAMyLLC.jpg',
  personUsingTech: 'https://media.gettyimages.com/id/599104836/photo/increasing-her-efforts-to-maximise-her-success.jpg?s=612x612&w=0&k=20&c=09pcUcgrZg_LRUaHE1D_O9HwkSi0yXhopxiJe8VEqwA=',
};

const LandingPage = () => {
  return (
    <div className="landing-container">
      <main>
        {/* HERO SECTION */}
        <section id="home" className="hero-section">
          <div className="hero-grid">
            <div className="hero-text-content">
              <p className="enjoy-text">Experience Tomorrow's Technology</p>
              <h1 className="main-headline">
                <span className="headline-gradient">Innovative Electronics</span>
                <span className="headline-sub">Powering Your Digital Life</span>
              </h1>
              <p className="hero-subtitle">
                Discover our cutting-edge range of electronics designed to enhance your everyday tasks and ignite your passion for technology.
              </p>

              <div className="hero-buttons">
                <button className="btn btn-primary">
                  <ShoppingCart size={18} />
                  Start Shopping with us
                </button>
              </div>

              <div className="reviews-preview">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <span className="review-text">Trusted by thousands of tech enthusiasts!</span>
              </div>
            </div>

            <div className="hero-product-showcase">
              <div className="product-image-wrapper">
                <img src={imageUrls.mainProduct} alt="Premium Electronic Device" className="hero-headphones-img" />
                <div className="product-glow"></div>
              </div>
            </div>
          </div>

          <div className="features-bar">
            <div className="feature-item"><Battery size={20} /> Long-Lasting</div>
            <div className="feature-item"><Zap size={20} /> Fast Charging</div>
            <div className="feature-item"><Bluetooth size={20} /> Seamless Connectivity</div>
            <div className="feature-item"><Shield size={20} /> Secure & Reliable</div>
            <div className="feature-item"><FileText size={20} /> Comprehensive Support</div>
          </div>
        </section>

        {/* INTRODUCTION SECTION */}
        <section id="introduction" className="introduction-section">
          <div className="intro-image-container">
            <img src={imageUrls.abstractTech} alt="Abstract technology illustration" />
          </div>
          <div className="intro-content">
            <h2 className="section-title">Welcome to ZepCart: Your Hub for Modern Electronics</h2>
            <p className="section-subtitle">
              At ZepCart, we're passionate about bringing you the latest and most innovative electronic devices that seamlessly integrate into your lifestyle.
            </p>
            <p className="section-subtitle">
              Our curated selection ensures you get reliable performance and exceptional value. Explore our diverse range and upgrade your tech game today!
            </p>
            <div className="intro-features">
              <div className="intro-feature-item"><Star size={24} className="feature-icon" /> <span>Top-Rated Products</span></div>
              <div className="intro-feature-item"><Shield size={24} className="feature-icon" /> <span>Certified Quality</span></div>
              <div className="intro-feature-item"><Zap size={24} className="feature-icon" /> <span>Next-Gen Innovation</span></div>
            </div>
            <button className="btn btn-primary">Discover More</button>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="services-section">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">We provide services that guarantee your satisfaction.</p>
          </div>
          <div className="services-container">
            <div className="service-item">
              <div className="service-icon-wrapper"><Truck size={32} /></div>
              <h3>Fast Shipping</h3>
              <p>Quick and reliable delivery on all your electronic purchases.</p>
            </div>
            <div className="service-item">
              <div className="service-icon-wrapper"><FileText size={32} /></div>
              <h3>Detailed Invoicing</h3>
              <p>Transparent billing with all necessary details for easy record-keeping.</p>
            </div>
            <div className="service-item">
              <div className="service-icon-wrapper"><Zap size={32} /></div>
              <h3>Easy Returns</h3>
              <p>Hassle-free return policy for ultimate peace of mind on every product.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
