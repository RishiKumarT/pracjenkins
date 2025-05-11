import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome, FiBox, FiUsers, FiBarChart2, FiSettings, FiChevronLeft, FiChevronRight
} from "react-icons/fi";

const navItems = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },
  { name: "Products", icon: FiBox, path: "/dashboard/products" },
  { name: "Orders", icon: FiBarChart2, path: "/dashboard/orders" },
  { name: "Users", icon: FiUsers, path: "/dashboard/users" },
  { name: "Analytics", icon: FiBarChart2, path: "/dashboard/analytics" },
  { name: "Settings", icon: FiSettings, path: "/dashboard/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <motion.div
      animate={{ width: isOpen ? 220 : 72 }}
      className="bg-black text-white h-screen shadow-lg flex flex-col justify-between transition-all duration-300"
    >
      <div className="p-4">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition"
          >
            {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </button>
        </div>

        <div className="space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <Link key={name} to={path}>
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  location.pathname === path
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-800"
                }`}
              >
                <Icon size={20} />
                {isOpen && <span className="text-sm">{name}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 text-xs text-gray-500 text-center">
          © Zyra Admin 2025
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;











// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FiHome,
//   FiBox,
//   FiUsers,
//   FiBarChart2,
//   FiSettings,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";

// const navItems = [
//   { name: "Dashboard", icon: FiHome },
//   { name: "Products", icon: FiBox },
//   { name: "Orders", icon: FiBarChart2 },
//   { name: "Users", icon: FiUsers },
//   { name: "Analytics", icon: FiBarChart2 },
//   { name: "Settings", icon: FiSettings },
// ];

// const Sidebar = ({ activePage, setActivePage }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <motion.div
//       animate={{ width: isOpen ? 220 : 72 }}
//       className="bg-black text-white h-screen shadow-lg flex flex-col justify-between transition-all duration-300"
//     >
//       <div className="p-4">
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-400 hover:text-white transition"
//           >
//             {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
//           </button>
//         </div>

//         <div className="space-y-2">
//           {navItems.map(({ name, icon: Icon }) => (
//             <div
//               key={name}
//               onClick={() => setActivePage(name)}
//               className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${
//                 activePage === name
//                   ? "bg-white text-black font-semibold"
//                   : "hover:bg-gray-800"
//               }`}
//             >
//               <Icon size={20} />
//               {isOpen && <span className="text-sm">{name}</span>}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom brand or version */}
//       {isOpen && (
//         <div className="p-4 text-xs text-gray-500 text-center">
//           © Zyra Admin 2025
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default Sidebar;
