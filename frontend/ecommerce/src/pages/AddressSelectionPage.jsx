import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/button";
import Navbar from "../components/Navbar2";
import { Link, useNavigate } from "react-router-dom";

export default function AddressSelectionPage() {
  const [form, setForm] = useState({ shippingAddress: "", billingAddress: "" });
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please sign in to continue");
      setLoading(false);
      return;
    }
    fetch("http://localhost:8081/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setCart)
      .catch(() => setError("Failed to fetch cart"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProceed = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: form.shippingAddress,
          billingAddress: form.billingAddress,
        }),
      });
      if (!res.ok) throw new Error("Failed to place order");
      localStorage.setItem("checkoutAddress", JSON.stringify(form));
      navigate("/paymentconfirmation");
    } catch {
      setError("Failed to place order");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-white p-6">
        <motion.h2
          className="text-3xl font-semibold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Enter Delivery Address
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Address Form */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-xl border-2 p-5 bg-white shadow-xl">
              <h4 className="font-bold text-lg mb-2">Shipping Address</h4>
              <textarea
                name="shippingAddress"
                value={form.shippingAddress}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2"
                placeholder="Enter shipping address"
                required
              />
              <h4 className="font-bold text-lg mb-2 mt-4">Billing Address</h4>
              <textarea
                name="billingAddress"
                value={form.billingAddress}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2"
                placeholder="Enter billing address (optional)"
              />
            </div>
          </motion.div>

          {/* Cart Summary */}
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
            <div className="space-y-4">
              {cart && cart.items && cart.items.length > 0 ? (
                cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <img
                      src={item.product.imageUrl ? (item.product.imageUrl.startsWith('http') ? item.product.imageUrl : `http://localhost:8081/images/${item.product.imageUrl}`) : 'https://placehold.co/100x100/png?text=Product'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 ml-4">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-right">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <div>Your cart is empty.</div>
              )}
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                ₹
                {cart && cart.items ? cart.items.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                ).toFixed(2) : 0}
              </span>
            </div>
            <Button
              className="w-full mt-4 bg-black text-white hover:bg-gray-900 transition-all"
              onClick={handleProceed}
              disabled={!form.shippingAddress}
            >
              Proceed to Payment
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
