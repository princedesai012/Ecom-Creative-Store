import React, { useEffect, useState } from 'react';
import { Search, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllProducts } from '../api/products.api';
import '../css/ProductPage.css';
import ProductCardSkeleton from './ProductDetailPage';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, page]);

  return (
    <div className="products-page-container">
      <div className="page-header">
        <h1 className="page-title">Discover Our Premium Collection</h1>
        <p className="page-subtitle">Curated products with elegance, performance, and innovation.</p>
      </div>

      <div className="filters-container">
        <div className="search-input-wrapper">
          <Search className="filter-icon" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search products by name..."
            className="filter-input"
          />
        </div>
        <div className="category-select-wrapper">
          <Tag className="filter-icon" size={20} />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="phone">Phones</option>
            <option value="laptop">Laptops</option>
            <option value="tablet">Tablets</option>
            <option value="accessory">Accessories</option>
          </select>
        </div>
      </div>

      {error && <p className="status-msg error">{error}</p>}

      {loading && products.length === 0 ? (
        <div className="full-page-loader">
          <div className="loader-spinner" />
        </div>
      ) : !loading && products.length === 0 ? (
        <p className="status-msg">No products found. Try adjusting filters or keywords.</p>
      ) : (
        <div className="product-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
            : products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
                  <div className="product-card">
                    <div className="product-image-container">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="product-info">
                      <span className="product-category-tag">{product.category}</span>
                      <h2 className="product-name">{product.name}</h2>
                      <p className="product-desc">{product.description}</p>
                      <div className="product-footer">
                        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <ChevronLeft size={18} /> Prev
          </button>
          <span className="pagination-info">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            className="pagination-btn"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
