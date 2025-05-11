import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white text-black px-8 md:px-20 py-10 mt-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Download Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">DOWNLOAD THE APP</h3>
          <div className="space-y-4">
            <img src="/googleplay.png" alt="Google Play" className="w-36" />
            <img src="/appstore.png" alt="App Store" className="w-36" />
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>WOMAN</li>
            <li>MAN</li>
            <li>KIDS</li>
            <li>BEAUTY</li>
            <li>HOME</li>
          </ul>
        </div>

        {/* Sites & Stores */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SITES & STORES</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>ABOUT US</li>
            <li>CONTACT US</li>
            <li>STORE LOCATOR</li>
            <li>MEDIA CENTER</li>
            <li>SITEMAP</li>
            <li>MEMBERSHIP</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">JOIN OUR NEWSLETTER</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get the latest updates from our stores
          </p>
          <input
            type="email"
            placeholder="Email Id"
            className="w-full border-b border-gray-400 mb-4 py-2 focus:outline-none"
          />
          <button className="w-full bg-black text-white py-2 font-semibold hover:bg-gray-800 transition">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Bottom Links and Socials */}
      <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="space-x-6 mb-4 md:mb-0">
          <span>TERMS & CONDITIONS</span>
          <span>PRIVACY POLICY</span>
          <span>RETURN POLICY</span>
        </div>
        <div className="flex gap-4 text-xl">
          <FiX />
          <FaFacebook />
          <FaInstagram />
          <FaYoutube />
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
