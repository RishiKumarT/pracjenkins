import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const categories = {
  Men: ['Shirts', 'T-Shirts', 'Lounge Wear', 'Trousers', 'Footwear', 'Accessories'],
  Women: ['Dresses', 'Tops', 'Skirts', 'Jeans', 'Footwear', 'Accessories'],
  Kids: ['T-Shirts', 'Shorts', 'Footwear', 'Toys'],
  Beauty: ['Skincare', 'Makeup', 'Fragrance'],
  Offers: ['Sale', 'New Arrivals', 'Best Sellers']
};

const NavItem = ({ label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="px-4 py-2 font-medium text-gray-700 hover:text-black">
        {label} <span className="ml-1">▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 bg-white shadow-lg rounded-md p-4 grid grid-cols-2 gap-4 z-50 min-w-[300px] w-max"
          >
            {items.map((item, idx) => (
              <div key={idx} className="text-sm text-gray-800 hover:underline cursor-pointer">
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Brand Logo */}
        <Link to="/">
          <div className="text-3xl font-bold tracking-wide">Zyra</div>
        </Link>

        {/* Center: Search Bar */}
        <div className="w-1/3 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full border rounded-full px-4 py-2 pl-10 bg-gray-100 focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/cart">
                <FiShoppingBag className="text-2xl cursor-pointer" />
              </Link>
              <Link to="/ordertrack">
                <button className="text-sm font-medium hover:underline">My Orders</button>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin">
              <button className="text-sm font-medium hover:underline">Sign In</button>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Nav Menu */}
      <div className="flex justify-center space-x-4 py-2 border-t bg-white">
        {Object.entries(categories).map(([label, items]) => (
          <NavItem key={label} label={label} items={items} />
        ))}
      </div>
    </div>
  );
}
