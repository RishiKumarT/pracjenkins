import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import  Button  from "../components/ui/button";
import Navbar from "../components/Navbar2";

export default function OrderTrackPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(null);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8081/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setOrders)
      .catch(() => setError("Failed to fetch orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please sign in to view your orders.");
      setLoading(false);
      return;
    }
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const handleCancel = async (orderId) => {
    setCancelling(orderId);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8081/api/orders/${orderId}/status?status=CANCELLED`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to cancel order");
      // Refresh orders after cancellation
      fetchOrders();
    } catch {
      setError("Failed to cancel order");
    } finally {
      setCancelling(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-white p-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Your Orders</h2>
        {orders.length === 0 ? (
          <div className="text-center text-gray-500">No orders found.</div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-bold">Order ID:</span> {order.id}
                  </div>
                  <div>
                    <span className="font-bold">Status:</span> {order.status}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-bold">Shipping Address:</span> {order.shippingAddress}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Billing Address:</span> {order.billingAddress}
                </div>
                <div>
                  <span className="font-bold">Items:</span>
                  <ul className="ml-4 list-disc">
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.product.name} x {item.quantity} (₹{item.price})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2 font-bold">
                  Total: ₹{order.totalAmount}
                </div>
                {order.status !== "CANCELLED" && (
                  <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleCancel(order.id)}
                    disabled={cancelling === order.id}
                  >
                    {cancelling === order.id ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
