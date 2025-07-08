import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Zap, ShoppingCart, Minus, Plus } from 'lucide-react';
import './ProductDetailPage.css';
import { getProductById } from '../api/products.api';

const ProductDetailSkeleton = () => (
  <div className="detail-grid skeleton-mode">
    <div className="image-gallery-skeleton">
      <div className="main-image-skeleton"></div>
      <div className="thumbnail-container-skeleton">
        <div className="thumbnail-skeleton"></div>
        <div className="thumbnail-skeleton"></div>
        <div className="thumbnail-skeleton"></div>
      </div>
    </div>
    <div className="product-details-skeleton">
      <div className="skeleton-line" style={{ width: '30%', height: '1rem' }}></div>
      <div className="skeleton-line" style={{ width: '80%', height: '2.5rem', margin: '1rem 0' }}></div>
      <div className="skeleton-line" style={{ width: '100%' }}></div>
      <div className="skeleton-line" style={{ width: '90%' }}></div>
      <div className="skeleton-line" style={{ width: '40%', height: '2rem', marginTop: '2rem' }}></div>
      <div className="skeleton-line" style={{ width: '100%', height: '3rem', marginTop: '2rem' }}></div>
    </div>
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        console.log('Fetched product:', data);
        setProduct(data.product);
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="product-detail-page"><ProductDetailSkeleton /></div>;
  if (error) return <div className="product-detail-page"><p className="status-msg error">{error}</p></div>;
  if (!product) return <div className="product-detail-page"><p className="status-msg">Product not found.</p></div>;

  return (
    <div className="product-detail-page">
      <div className="detail-grid">
        {/* --- Image Gallery --- */}
        <div className="image-gallery">
          <div className="main-image-container">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="main-product-image"
            />
          </div>
        </div>

        {/* --- Product Details --- */}
        <div className="product-details-content">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="product-detail-name">{product.name}</h1>

          <div className="product-brand-stock">
            <span className="brand">Brand: <strong>{product.brand}</strong></span>
            
          </div>

          <div className="reviews-preview">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-icon" />
              ))}
            </div>
            <span className="review-text">4.8 (150 reviews)</span>
          </div>

          <p className="product-detail-description">{product.description}</p>

          <div className="price-section">
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          </div>

          {/* Dummy Features List */}
          <ul className="features-list">
            <li><Zap size={18} /> Great build quality</li>
            <li><Zap size={18} /> Fast shipping</li>
            <li><Zap size={18} /> 1-year warranty</li>
          </ul>

          <div className="actions-container">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={16} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
            </div>
            <button className="btn-primary add-to-cart-btn">
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>

          <button className="btn-secondary buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
