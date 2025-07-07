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
  
  Youtube,
  Facebook,
  Star,
  Volume2, // Keep Volume2 as a brand icon, as sound is still part of electronics
  Bluetooth, // Could be generic, useful for many electronics
  Battery,   // Generic
  Zap,       // Generic
  ChevronRight
} from 'lucide-react';
import './LandingPage.css';


const imageUrls = {
  // Main hero image - let's find a more general electronics image or keep a modern tech vibe
  abstractTech: 'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZmphbmtzaGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D', // Example of a generic tech image (laptop, phone, etc. on a desk)
  // For the introduction section, keep abstract sound or choose something that represents innovation/tech
  mainProduct: 'https://t4.ftcdn.net/jpg/14/08/64/83/240_F_1408648340_bQHXLioid5yCVVhEX9TkNRUSHdAMyLLC.jpg', // Can represent innovation/data
  // You might want to remove specific product images if you don't have a product section
  // For the help section, keeping a person using tech is good.
  personUsingTech: 'https://media.gettyimages.com/id/599104836/photo/increasing-her-efforts-to-maximise-her-success.jpg?s=612x612&w=0&k=20&c=09pcUcgrZg_LRUaHE1D_O9HwkSi0yXhopxiJe8VEqwA=', // Woman listening to music still fits 'electronics' user
};

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* -------------------- HEADER -------------------- */}
      <header className="header">
        <nav className="navbar">
          <a href="/" className="nav-brand">
            <Volume2 className="brand-icon" /> {/* Keeping the sound icon for brand, as audio is a major electronic category */}
            <span className="brand-text">ZepCart</span>
          </a>
          <div className="nav-links">
            <a href="#home" className="nav-link active">Home</a>
            
           
            <a href='#' className='nav-link'> products</a>
            <a href="#help" className="nav-link">Help Centre</a>
          </div>
          <div className="nav-icons">
            <a href="/login" className="nav-icon-btn">
              <User size={20} />
            </a>
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
                    <p className="enjoy-text">Experience Tomorrow's Technology</p> {/* More general */}
                    <h1 className="main-headline">
                        <span className="headline-gradient">Innovative Electronics</span> {/* Changed to electronics */}
                        <span className="headline-sub">Powering Your Digital Life</span> {/* More general */}
                    </h1>
                    <p className="hero-subtitle">Discover our cutting-edge range of electronics designed to enhance your everyday tasks and ignite your passion for technology.</p> {/* More general */}

                    <div className="hero-buttons">
                        <button className="btn btn-primary">
                            <ShoppingCart size={18} />
                            Start Shopping with us
                        </button>
                        {/* <button className="btn btn-secondary">
                            Explore Collections
                        </button> */}
                    </div>

                    <div className="reviews-preview">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => <Star key={i} className="star-icon" />)}
                        </div>
                        <span className="review-text">Trusted by thousands of tech enthusiasts!</span> {/* More general review text */}
                    </div>
                </div>

                <div className="hero-product-showcase">
                    <div className="product-image-wrapper">
                        <img src={imageUrls.mainProduct} alt="Premium Electronic Device" className="hero-headphones-img"/> {/* Changed alt text and potentially image */}
                        <div className="product-glow"></div>
                    </div>
                </div>
            </div>

            <div className="features-bar">
                <div className="feature-item"><Battery size={20} /> Long-Lasting</div> {/* More general */}
                <div className="feature-item"><Zap size={20} /> Fast Charging</div> {/* More general */}
                <div className="feature-item"><Bluetooth size={20} /> Seamless Connectivity</div> {/* More general */}
                <div className="feature-item"><Shield size={20} /> Secure & Reliable</div> {/* More general */}
                <div className="feature-item"><FileText size={20} /> Comprehensive Support</div> {/* New, general feature */}
            </div>
        </section>


        {/* -------------------- INTRODUCTION SECTION -------------------- */}
        <section id="introduction" className="introduction-section">
          <div className="intro-image-container">
            <img src={imageUrls.abstractTech} alt="Abstract technology illustration" /> {/* Changed alt text */}
          </div>
          <div className="intro-content">
            <h2 className="section-title">Welcome to ZepCart: Your Hub for Modern Electronics</h2> {/* General title */}
            <p className="section-subtitle">
              At ZepCart, we're passionate about bringing you the latest and most innovative electronic devices that seamlessly integrate into your lifestyle. From cutting-edge gadgets to essential home tech, we've got you covered.
            </p>
            <p className="section-subtitle">
              Founded on the principle of delivering **quality and innovation**, ZepCart is your ultimate destination for everything electronic. Our curated selection ensures you get reliable performance and exceptional value. Explore our diverse range and upgrade your tech game today!
            </p>
            <div className="intro-features">
              <div className="intro-feature-item">
                <Star size={24} className="feature-icon" />
                <span>Top-Rated Products</span> {/* More general */}
              </div>
              <div className="intro-feature-item">
                <Shield size={24} className="feature-icon" />
                <span>Certified Quality</span> {/* More general */}
              </div>
              <div className="intro-feature-item">
                <Zap size={24} className="feature-icon" /> {/* Changed icon and text */}
                <span>Next-Gen Innovation</span> {/* More general */}
              </div>
            </div>
            <button className="btn btn-primary">Discover More</button> {/* Changed button text */}
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
                    <h3>Fast Shipping</h3> {/* More general */}
                    <p>Quick and reliable delivery on all your electronic purchases.</p> {/* More general */}
                </div>
                <div className="service-item">
                    <div className="service-icon-wrapper"><FileText size={32} /></div>
                    <h3>Detailed Invoicing</h3> {/* More general */}
                    <p>Transparent billing with all necessary details for easy record-keeping.</p> {/* More general */}
                </div>
                <div className="service-item">
                    <div className="service-icon-wrapper"><RotateCcw size={32} /></div>
                    <h3>Easy Returns</h3> {/* More general */}
                    <p>Hassle-free return policy for ultimate peace of mind on every product.</p> {/* More general */}
                </div>
            </div>
        </section>

        {/* -------------------- HELP CENTRE SECTION -------------------- */}
        <section id="help" className="help-section">
          <div className="help-content">
            <h2 className="section-title">Need Assistance?</h2> {/* More general */}
            <p className="section-subtitle">Our dedicated support team is ready to help with any queries about our electronics.</p> {/* More general */}
            <div className="help-buttons">
              <a href="#" className="help-btn"><span>Check Order Status</span> <ChevronRight /></a> {/* More general */}
              <a href="#" className="help-btn"><span>Warranty Information</span> <ChevronRight /></a> {/* More general */}
              <a href="#" className="help-btn"><span>Product Support</span> <ChevronRight /></a> {/* More general */}
              <a href="#" className="help-btn"><span>Contact Customer Care</span> <ChevronRight /></a> {/* More general */}
            </div>
          </div>
          <div className="help-image-container">
              <img src={imageUrls.personUsingTech} alt="Person using electronic device" /> {/* More general alt text */}
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
                        <h3>ZepCart</h3>
                    </a>
                    <p>Innovative Electronics, Unmatched Experience.</p> {/* More general */}
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
    </div>
  );
};

export default LandingPage; 