import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f5f5] to-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl font-extrabold text-gray-900 mb-4"
        >
          404
        </motion.h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/"
            className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
