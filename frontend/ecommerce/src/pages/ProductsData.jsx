import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

// ProductCard Component
const ProductCard = ({ product }) => (
  <Link to={`/productitem/${product.id}`}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-md shadow-sm overflow-hidden relative group"
    >
      <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
        {product.label || "New"}
      </span>
      <FiHeart className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black cursor-pointer transition-opacity" />
      <img 
        src={product.imageUrl ? (product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:8081/images/${product.imageUrl}`) : 'https://placehold.co/400x400/png?text=Product+Image'} 
        alt={product.name} 
        className="w-full h-[400px] object-cover" 
      />
      <div className="p-4">
        <p className="text-sm text-gray-500 font-semibold">{product.brand || 'Brand'}</p>
        <p className="text-sm text-gray-800 mt-1">{product.name}</p>
        <p className="text-base font-semibold mt-1">₹ {product.price?.toFixed(2)}</p>
      </div>
    </motion.div>
  </Link>
);

// Main Component
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const query = useQuery().get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        let url = "http://localhost:8081/api/products";
        if (query) {
          url = `http://localhost:8081/api/products/search?query=${encodeURIComponent(query)}`;
        }
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <Navbar />
      <div className="px-8 py-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Men's T-Shirts</h2>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center text-gray-700 hover:underline"
            >
              <BsFilter className="mr-1" /> FILTER
            </button>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="default">Sort</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 p-4 bg-white rounded shadow"
          >
            <p className="text-gray-600 text-sm">Filters coming soon...</p>
          </motion.div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
