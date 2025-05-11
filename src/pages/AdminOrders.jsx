import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const statusColors = {
  Pending: 'bg-yellow-500',
  Shipped: 'bg-blue-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-500',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');

      // Log and validate the response
      console.log("Fetched orders:", response.data);

      // If orders are wrapped in an object, fix it here
      const fetched = response.data;

      if (Array.isArray(fetched)) {
        setOrders(fetched);
      } else if (fetched && Array.isArray(fetched.orders)) {
        setOrders(fetched.orders);
      } else {
        console.error("Unexpected orders data format:", fetched);
        setOrders([]);
      }

    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            orders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-5 rounded-xl shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">Customer: {order.customerName}</p>
                    <p className="text-sm text-gray-500">Total: ₹{order.total}</p>
                  </div>
                  <span
                    className={`text-white px-3 py-1 rounded-full text-sm ${statusColors[order.status] || 'bg-gray-500'}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-2">
                  <label className="text-sm font-medium text-gray-700">Update Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="ml-2 border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AdminOrders;
