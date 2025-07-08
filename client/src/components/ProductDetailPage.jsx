import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Zap, ShoppingCart, Minus, Plus } from 'lucide-react';
import './ProductDetailPage.css';
import { getProductById } from '../api/products.api';
import { useCart } from '../context/CartContext'; // ✅ Import useCart

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart(); // ✅ Get addToCart function

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

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    alert("Item added to cart!");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <div>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(q => q + 1)}>+</button>
      </div>
      <button onClick={handleAddToCart}>
        <ShoppingCart size={18} /> Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
