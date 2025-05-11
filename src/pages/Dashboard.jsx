import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import DashboardCard from '../components/DashboardCard';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 7000 }
];

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard title="Total Sales" value="₹2,50,000" />
        <DashboardCard title="Total Orders" value="1,200" />
        <DashboardCard title="Total Users" value="980" />
      </div>

      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Monthly Sales Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#d1d5db' }} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366f1"
              strokeWidth={4}
              dot={{ r: 6, fill: '#6366f1' }}
              activeDot={{ r: 8, stroke: '#4f46e5', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
