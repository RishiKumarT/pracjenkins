// src/AdminHome.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Changed from Sidebar to SideBar to match your component name
import Dashboard from './pages/Dashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';

const AdminHome = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('Dashboard');

  const handleLogout = () => {
    onLogout(); // Reset authentication
    navigate('/'); // Redirect to login
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>

        {/* Routes */}
        <Routes>
          <Route index element={<Dashboard />} /> {/* when user visits /dashboard */}
          <Route path="products" element={<AdminProducts />} /> {/* /dashboard/products */}
          <Route path="orders" element={<AdminOrders />} />   {/* /dashboard/orders */}
          {/* Optional fallback */}
          <Route path="*" element={<Dashboard />} />
      </Routes>

      </div>
    </div>
  );
};

export default AdminHome;











































// import React, { useState } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// // import Products from './pages/Products';
// // import Orders from './pages/Orders';
// // import Users from './pages/Users';
// // import Analytics from './pages/Analytics';
// // import Settings from './pages/Settings';

// const AdminHome = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState('Dashboard');

//   const handleLogout = () => {
//     onLogout(); // Reset authentication
//     navigate('/'); // Redirect to login
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar activePage={activePage} setActivePage={setActivePage} />

//       {/* Main content */}
//       <div className="flex-1 p-6 overflow-y-auto relative">
//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
//         >
//           Logout
//         </button>

//         {/* Routes */}
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           {/* <Route path="/products" element={<Products />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/settings" element={<Settings />} /> */}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;
