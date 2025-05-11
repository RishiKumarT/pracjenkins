import { motion } from "framer-motion";
import React from "react";

const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`bg-black text-white px-6 py-3 rounded-2xl shadow-md font-medium transition-colors duration-300 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
