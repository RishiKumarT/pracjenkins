import { motion } from 'framer-motion';

const accessories = [
  { title: 'Casual Shirts', desc: 'Stay Effortlessly Cool', img: '/images/shirts.jpg' },
  { title: 'Luxury Eyewear', desc: 'See the World in Style', img: '/images/eyewear.jpg' },
  { title: 'Signature Watches', desc: 'Define Every Moment', img: '/images/watch.jpg' },
  { title: 'Classic Footwear', desc: 'Walk with Confidence', img: '/images/footwear.jpg' },
];

export default function HeroSection3() {
  return (
    <section className="py-16 px-4 bg-gray-100 text-center relative py-20 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 overflow-hidden">
      <h2 className="text-3xl font-bold mb-10">Complete Your Look – Must-Have Accessories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {accessories.map((item, index) => (
          <motion.div
            key={item.title}
            className="overflow-hidden rounded-lg shadow-md bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <img src={item.img} alt={item.title} className="w-full h-80 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
