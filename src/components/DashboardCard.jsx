import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg relative overflow-hidden"
    >
      {/* Gradient border glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 opacity-20 blur-xl z-0" />

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
