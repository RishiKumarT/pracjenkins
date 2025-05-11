import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiTruck, FiRotateCw, FiStar } from 'react-icons/fi';
import Navbar from '../components/Navbar';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [showDetails, setShowDetails] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8081/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch product details');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10">Loading...</div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10 text-red-500">Error: {error || 'Product not found'}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-6 py-10 flex justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <motion.img
            src={product.imageUrl ? (product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:8081/images/${product.imageUrl}`) : 'https://placehold.co/550x700/png?text=Product+Image'}
            alt={product.title}
            className="rounded-xl w-full object-cover"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <p className="text-sm text-gray-400 uppercase">{product.brand || 'BRAND'}</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-tight">
              {product.title}
            </h1>
            <p className="text-xl font-medium text-gray-700">
              ₹{product.price?.toFixed(2)}{" "}
              <span className="text-sm text-gray-400">incl. of all taxes</span>
            </p>

            {/* Size Options */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">SIZE</h3>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 border text-sm font-medium rounded-md ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 text-gray-800 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="bg-black text-white py-4 px-6 rounded-xl text-sm font-semibold transition"
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    navigate('/signin');
                    return;
                  }
                  
                  const res = await fetch(`http://localhost:8081/api/cart/items?productId=${product.id}&quantity=1`, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  });
                  const text = await res.text();
                  console.log("Raw response from add-to-cart:", text);

                  if (!res.ok) {
                    alert(`Failed to add item to cart: ${text}`);
                    return;
                  }
                  try {
                    const data = JSON.parse(text);
                    // Optionally: do something with data
                  } catch (e) {
                    alert("Server returned invalid JSON. Please contact support.");
                    return;
                  }
                  navigate('/cart');
                } catch (error) {
                  console.error('Error adding to cart:', error);
                  alert('Failed to add item to cart. Please try again.');
                }
              }}
            >
              ADD TO BAG
            </motion.button>

            {/* Features Icons */}
            <div className="flex gap-8 text-sm text-gray-600 mt-2">
              <div className="flex items-center gap-2"><FiTruck /> Free shipping</div>
              <div className="flex items-center gap-2"><FiRotateCw /> Easy Returns</div>
              <div className="flex items-center gap-2"><FiStar /> Fresh Fashion</div>
            </div>

            {/* Product Details Toggle */}
            <div className="border-t pt-4 mt-6">
              <button
                className="text-sm font-medium text-gray-700 flex justify-between items-center w-full"
                onClick={() => setShowDetails(!showDetails)}
              >
                Product Details and Overview
                <span className="text-xl">{showDetails ? '−' : '+'}</span>
              </button>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 bg-gray-100 p-4 rounded-md text-sm text-gray-700 space-y-2"
                >
                  <p><strong>SKU:</strong> {product.sku || 'N/A'}</p>
                  <p><strong>Description:</strong> {product.description || 'No description available.'}</p>
                  <p><strong>Dimensions:</strong> {product.dimensions || 'N/A'}</p>
                  <p>
                    {product.details || 'This is a great product with premium materials and modern design.'}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
