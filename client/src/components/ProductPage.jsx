// src/components/ProductsPage.jsx

import React, { useEffect, useState } from 'react';
// import { getAllProducts } from '../api/products.api'; // Assuming this is your API call
import { Search, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductPage.css';

// --- Skeleton Loader Component ---
const ProductSkeleton = () => (
    <div className="product-card-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-info">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line desc"></div>
            <div className="skeleton-line desc short"></div>
            <div className="skeleton-line price"></div>
        </div>
    </div>
);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Set to true initially
  const [error, setError] = useState('');

  // Mock API call for demonstration
  const getAllProducts = async (query) => {
    // Replace this with actual API call
    console.log(`Fetching products with query: ${query}`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                products: [
                    { _id: '1', imageUrl: 'https://plus.unsplash.com/premium_photo-1726079246917-46f2b37f7e9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGVsZWN0cm9uaWMlMjBwcm9kdWN0fGVufDB8fDB8fHww.png', name: 'AuraMax Headphones', description: 'Crystal-clear audio with adaptive noise cancellation.', price: 9999 },
                    { _id: '2', imageUrl: 'https://plus.unsplash.com/premium_photo-1726079246917-46f2b37f7e9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGVsZWN0cm9uaWMlMjBwcm9kdWN0fGVufDB8fDB8fHww.png', name: 'AuraMax Headphones', name: 'NanoBuds Pro', description: 'Compact, powerful, and ready for anything.', price: 4999 },
                    { _id: '3', imageUrl: 'https://plus.unsplash.com/premium_photo-1726079246917-46f2b37f7e9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGVsZWN0cm9uaWMlMjBwcm9kdWN0fGVufDB8fDB8fHww.png', name: 'AuraMax Headphones', name: 'SonicSphere 360', description: 'Immersive room-filling sound in a sleek package.', price: 7999 },
                    { _id: '4', imageUrl: 'https://plus.unsplash.com/premium_photo-1726079246917-46f2b37f7e9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGVsZWN0cm9uaWMlMjBwcm9kdWN0fGVufDB8fDB8fHww.png', name: 'AuraMax Headphones', name: 'Ember Gaming Headset', description: 'Gain the competitive edge with positional audio.', price: 12999 },
                    { _id: '5', imageUrl: 'https://plus.unsplash.com/premium_photo-1726079246917-46f2b37f7e9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGVsZWN0cm9uaWMlMjBwcm9kdWN0fGVufDB8fDB8fHww.png', name: 'AuraMax Headphones', name: 'Nebula Over-Ear', description: 'Studio-quality sound for the discerning audiophile.', price: 15999 },
                    { _id: '6', imageUrl: 'https://plus.unsplash.com/premium_photo-1726079246917-46f2b37f7e9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGVsZWN0cm9uaWMlMjBwcm9kdWN0fGVufDB8fDB8fHww.png', name: 'AuraMax Headphones', name: 'AuraMax Headphones', description: 'Crystal-clear audio with adaptive noise cancellation.', price: 9999 },
                ],
                totalPages: 3
            });
        }, 1500); // Simulate network delay
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const query = `?search=${search}&category=${category}&page=${page}`;
        const data = await getAllProducts(query);
        setProducts(data.products);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, page]);

  return (
    <div className="products-page-container">
      <div className="page-header">
        <h1 className="page-title">Explore Our Collection</h1>
        <p className="page-subtitle">Engineered for the purest sound experience.</p>
      </div>

      <div className="filters-container">
        <div className="search-input-wrapper">
          <Search className="filter-icon" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name..."
            className="filter-input"
          />
        </div>
        <div className="category-select-wrapper">
          <Tag className="filter-icon" size={20} />
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="headphones">Headphones</option>
            <option value="earbuds">Earbuds</option>
            <option value="speakers">Speakers</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>
      </div>

      {error && <p className="status-msg error">{error}</p>}

      <div className="product-grid">
        {loading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)
        ) : (
            // Show products when loaded
            products.map((product) => (
                <div key={product._id} className="product-card">
                    <div className="product-image-container">
                        <img src={product.imageUrl} alt={product.name} className="product-img" />
                    </div>
                    <div className="product-info">
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-desc">{product.description}</p>
                        <div className="product-footer">
                            <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                            <a href={`/product/${product._id}`} className="btn-view-product">View</a>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button className="pagination-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={18} /> Prev
          </button>
          <span className="pagination-info">Page {page} of {totalPages}</span>
          <button className="pagination-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;