import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl font-extrabold text-gray-900 mb-4"
        >
          Discover Your Style with Zyra
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg text-gray-700 mb-8"
        >
          Explore the latest fashion trends curated for you.
        </motion.p>

        {/* Buttons */}
        
        <div className="flex justify-center space-x-4">
        <Link to="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium shadow-lg hover:bg-gray-900"
          >
            Shop Now
          </motion.button>
        </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full border border-black text-black text-sm font-medium shadow-lg hover:bg-gray-100"
          >
            Explore Categories
          </motion.button>
        </div>
      </div>
    </section>
  );
}
