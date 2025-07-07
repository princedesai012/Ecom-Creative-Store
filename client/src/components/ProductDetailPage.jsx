// src/components/ProductDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Zap, Shield, Battery, ShoppingCart, Minus, Plus } from 'lucide-react';
import './ProductDetailPage.css'; 

// --- Skeleton Loader for this page ---
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
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    // Mock API call to get a single product by ID
    const getProductById = async (productId) => {
        console.log(`Fetching product with ID: ${productId}`);
        const mockProduct = {
            _id: '1',
            name: 'AuraMax Headphones',
            category: 'Headphones',
            price: 9999,
            originalPrice: 15999,
            rating: 4.8,
            reviews: 2847,
            description: 'Experience unparalleled audio clarity with the AuraMax Headphones. Featuring state-of-the-art adaptive noise cancellation, studio-quality sound, and a sleek, comfortable design built for all-day listening.',
            gallery: [
                'https://i.ibb.co/x7T4Y17/headphones-white.png',
                'https://i.ibb.co/L6gD9xG/headphones-main.png',
                'https://i.ibb.co/yQdKPC3/headphone-red.png',
            ],
            features: [
                { icon: <Battery />, text: '20-Hour Battery Life' },
                { icon: <Zap />, text: 'Rapid Fast Charging' },
                { icon: <Shield />, text: '1-Year Premium Warranty' },
            ]
        };
        return new Promise(resolve => setTimeout(() => resolve(mockProduct), 1000));
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const data = await getProductById(id);
                setProduct(data);
                setSelectedImage(data.gallery[0]); // Set the first image as default
            } catch (err) {
                setError('Failed to fetch product details.');
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
                        <img src={selectedImage} alt={product.name} className="main-product-image" />
                    </div>
                    <div className="thumbnail-container">
                        {product.gallery.map((img, index) => (
                            <div
                                key={index}
                                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Product Details --- */}
                <div className="product-details-content">
                    <span className="product-category-tag">{product.category}</span>
                    <h1 className="product-detail-name">{product.name}</h1>

                    {/* <div className="reviews-preview">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => <Star key={i} className="star-icon" />)}
                        </div>
                        <span className="review-text">{product.rating}/5 from {product.reviews.toLocaleString()} reviews</span>
                    </div> */}

                    <p className="product-detail-description">{product.description}</p>

                    <div className="price-section">
                        <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <ul className="features-list">
                        {product.features.map((feature, index) => (
                            <li key={index}>{feature.icon}{feature.text}</li>
                        ))}
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