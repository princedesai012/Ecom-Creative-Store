import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import '../css/ProductDetailPage.css';
import {
  getProductById,
  addReviewToProduct,
  getReviewtoproduct,
  getAllProducts
} from '../api/products.api';
import { addToCart } from "../api/cart.api";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [posting, setPosting] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data.product);

        const fetchedReviews = await getReviewtoproduct(id);
        setReviews(fetchedReviews.reviews || []);

        const all = await getAllProducts();
        const filtered = all.products.filter(
          (p) => p._id !== id && p.category === data.product.category
        );
        setAllProducts(filtered.slice(0, 4));
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product?._id) return;
    try {
      await addToCart(product._id, quantity);
      navigate("/cart");
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add item to cart.");
    }
  };

  const handleReviewSubmit = async () => {
    if (!newReview.comment.trim()) return alert("Please enter a comment.");
    setPosting(true);
    try {
      await addReviewToProduct(id, {
        rating: newReview.rating,
        comment: newReview.comment
      });

      const updatedReviews = await getReviewtoproduct(id);
      setReviews(updatedReviews.reviews || []);
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      alert("Failed to post review.");
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-circle" />
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return <div className="error-message">{error || "Product not found."}</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </div>

      <div className="product-info-section">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-brand">Brand: <span>{product.brand}</span></p>
        <p className="product-category">Category: <span>{product.category}</span></p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>

        <div className="product-rating">
          <Star size={18} fill="#fbbf24" stroke="#fbbf24" />
          <span>4.5/5</span>
        </div>

        <div className="quantity-control">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={18} /></button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}><Plus size={18} /></button>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
       {/* Related Products Section */}
      {allProducts.length > 0 && (
        <div className="related-products">
          <h3 className="related-title">🛍️ You May Also Like</h3>
          <div className="related-grid">
            {allProducts.map((prod) => (
              <div
                key={prod._id}
                className="related-card"
                onClick={() => navigate(`/product/${prod._id}`)}
              >
                <img src={prod.imageUrl} alt={prod.name} className="related-image" />
                <p className="related-name">{prod.name}</p>
                <p className="related-price">₹{prod.price.toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Review Section */}
      <div className="review-section">
        <h3 className="review-title">📝 Add a Review</h3>
        <div className="review-form">
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= newReview.rating ? 'filled' : ''}`}
                onClick={() => setNewReview({ ...newReview, rating: star })}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Write your comment..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />
          <button onClick={handleReviewSubmit} disabled={posting}>
            {posting ? "Posting..." : "Submit Review"}
          </button>
        </div>

        <h3 className="review-title">🗣️ User Reviews</h3>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.map((rev, i) => (
              <li key={i} className="review-item">
                <strong>{rev.user?.name || "Anonymous"}</strong>
                <div className="user-rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= rev.rating ? "#fbbf24" : "none"}
                      stroke="#fbbf24"
                    />
                  ))}
                </div>
                <p>{rev.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

     
    </div>
  );
};

export default ProductDetailPage;
