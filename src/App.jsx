import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminHome from "./AdminHome";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        {/* Only show AdminHome if logged in */}
        {isAuthenticated && (
          <Route path="/dashboard/*" element={<AdminHome onLogout={handleLogout} />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
