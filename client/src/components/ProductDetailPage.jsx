import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import './ProductDetailPage.css';
import { getProductById } from '../api/products.api';
import { addToCart } from "../api/cart.api"; // Should accept productId + quantity

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
        setProduct(data.product);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !product._id) return;

    try {
      const response = await addToCart(product._id, quantity);
      console.log("Item added to cart:", response);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Something went wrong while adding the item to the cart.");
    }
  };

  if (loading) return <p className="loader">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Product not found.</p>;

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
        <p className="product-price">₹{product.price}</p>
        <div className="product-rating">
          <Star size={18} fill="#fbbf24" stroke="#fbbf24" />
          <span>4.5/5</span>
        </div>

        <div className="quantity-control">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
            <Minus size={18} />
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>
            <Plus size={18} />
          </button>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
