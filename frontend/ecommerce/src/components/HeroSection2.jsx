import { motion } from "framer-motion";

const categories = [
  { title: "Lounge Wear", image: '/images/lounge.jpg', products: 1 },
  { title: "Polos", image: '/images/polos.jpg', products: 1 },
  { title: "Trousers", image: '/images/trousers.jpg', products: 1 },
  { title: "Sports Wear", image: '/images/sport.jpg', products: 2 },
  { title: "Hoodies", image: '/images/hoodie.jpg', products: 4 },
  { title: "Linen", image: '/images/linen.jpg', products: 3 },
];

export default function HeroSection2() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 overflow-hidden">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-gray-900"
        >
          Shop by Category
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-700 mt-2"
        >
          Explore our wide range of carefully selected products across various categories.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-16">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="relative h-60 rounded-xl overflow-hidden shadow-lg"
          >
            <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
              <h3 className="text-xl font-bold">{cat.title}</h3>
              <p>{cat.products} {cat.products > 1 ? "products" : "product"}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full bg-black text-white font-medium shadow-lg"
        >
          View All Categories
        </motion.button>
      </div>
    </section>
  );
}

