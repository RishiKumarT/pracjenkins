import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/button";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please sign in to view your cart");
        setLoading(false);sh
        return;
      }

      const res = await fetch("http://localhost:8081/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      if (res.status === 403) {
        setError("You are not authorized. Please log in again.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError(`Server error: ${text}`);
        setLoading(false);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        setError("Server returned invalid JSON. Please contact support.");
        setLoading(false);
        return;
      }

      setCartItems(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const increment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const currentItem = cartItems.find(item => item.product.id === id);
      if (!currentItem) {
        setError("Item not found in cart");
        return;
      }

      // Calculate new quantity
      const newQuantity = currentItem.quantity + 1;

      // Validate against stock limit
      if (newQuantity > currentItem.product.stock) {
        setError(`Cannot add more items. Only ${currentItem.product.stock} items available in stock.`);
        return;
      }

      const res = await fetch(`http://localhost:8081/api/cart/items/${id}?quantity=${newQuantity}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      let errorMessage;
      try {
        const data = JSON.parse(text);
        errorMessage = data.message || "Failed to update quantity";
      } catch (e) {
        errorMessage = text || "Failed to update quantity";
      }

      if (res.status === 403) {
        setError("You are not authorized. Please log in again.");
        return;
      }
      if (!res.ok) {
        setError(errorMessage);
        return;
      }

      fetchCartItems(); // Refresh cart items
    } catch (err) {
      setError(err.message || "Failed to update quantity");
    }
  };

  const decrement = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const currentItem = cartItems.find(item => item.product.id === id);
      if (!currentItem) {
        setError("Item not found in cart");
        return;
      }

      // If quantity is 1, remove the item
      if (currentItem.quantity <= 1) {
        await removeItem(id);
        return;
      }

      // Calculate new quantity
      const newQuantity = currentItem.quantity - 1;

      // Validate against stock limit
      if (newQuantity > currentItem.product.stock) {
        setError(`Cannot update quantity. Only ${currentItem.product.stock} items available in stock.`);
        return;
      }

      const res = await fetch(`http://localhost:8081/api/cart/items/${id}?quantity=${newQuantity}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      let errorMessage;
      try {
        const data = JSON.parse(text);
        errorMessage = data.message || "Failed to update quantity";
      } catch (e) {
        errorMessage = text || "Failed to update quantity";
      }

      if (res.status === 403) {
        setError("You are not authorized. Please log in again.");
        return;
      }
      if (!res.ok) {
        setError(errorMessage);
        return;
      }

      fetchCartItems(); // Refresh cart items
    } catch (err) {
      setError(err.message || "Failed to update quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8081/api/cart/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 403) {
        setError("You are not authorized. Please log in again.");
        return;
      }
      if (!res.ok) throw new Error("Failed to remove item");
      fetchCartItems(); // Refresh cart items
    } catch (err) {
      setError(err.message);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6 bg-gradient-to-br from-pink-50 to-blue-100 min-h-screen">
          <div className="text-center py-10">Loading cart items...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="p-6 bg-gradient-to-br from-pink-50 to-blue-100 min-h-screen">
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gradient-to-br from-pink-50 to-blue-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.imageUrl ? (item.product.imageUrl.startsWith('http') ? item.product.imageUrl : `http://localhost:8081/images/${item.product.imageUrl}`) : 'https://placehold.co/150x150/png?text=Product'}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.product.size}</p>
                      <p className="font-bold mt-1">₹{item.product.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrement(item.product.id)}
                      className="px-3 py-1 text-xl bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.product.id)}
                      disabled={item.quantity >= item.product.stock}
                      className={`px-3 py-1 text-xl rounded-full ${
                        item.quantity >= item.product.stock
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-500 ml-2">
                      (Stock: {item.product.stock})
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
              <p className="flex justify-between font-medium">
                <span>Subtotal:</span> <span>₹{totalAmount}</span>
              </p>
              <p className="flex justify-between text-sm text-gray-500">
                <span>Delivery:</span> <span>Free</span>
              </p>
              <div className="border-t my-4" />
              <p className="flex justify-between text-lg font-bold">
                <span>Total:</span> <span>₹{totalAmount}</span>
              </p>
              <Link to="/checkout">
                <Button className="w-full mt-6">Proceed to Checkout</Button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
