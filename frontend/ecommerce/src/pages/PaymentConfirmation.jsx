import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import  Button  from "../components/ui/button";
import Navbar from "../components/Navbar2";
import { Link } from "react-router-dom";

export default function PaymentConfirmation() {
  const [loading, setLoading] = useState(true);

  // Simulate payment loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-white px-4">
      {loading ? (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"
            transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
          />
          <p className="mt-6 text-lg font-medium text-gray-600">Processing Payment...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center space-y-6 max-w-md w-full"
        >
          <CheckCircle className="text-green-500 w-16 h-16" />
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 text-center">
            Thank you for shopping with <span className="font-semibold">Zyra</span>. Your payment was successful.
          </p>
          <Link to="/ordertrack">
          <Button className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-900 transition">
            Track Your Order
          </Button>
          </Link>
        </motion.div>
      )}
    </div>
    </>
  );
}
