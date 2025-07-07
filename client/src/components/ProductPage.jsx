import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/products.api';
import './ProductPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = `?search=${search}&category=${category}&page=${page}`;
      const data = await getAllProducts(query);
      setProducts(data.products);
      console.log(data);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, page]);

  return (
    <div className="products-page">
      <h1 className="title">Explore Our Products</h1>

      <div className="filters">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search products..."
          className="search-input"
        />
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="category-select"
        >
          <option value="">All Categories</option>
          <option value="phone">phone</option>
          <option value="laptop">laptop</option>
          <option value="tablet">tablet</option>
          <option value="accessory">accessory</option>
        </select>
       
      </div>

      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg error">{error}</p>}

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-img"
            />
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀ Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
