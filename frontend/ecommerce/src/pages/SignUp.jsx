import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar2 from "../components/Navbar2";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dateOfBirth: formData.dob,
        contact: formData.contact,
        role: "USER" // or omit if backend sets default
      });

      console.log(response.data);
      alert("Registration successful!");
      navigate("/signin");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed!");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f5f5] to-gray-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg"
        >
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-wide">
            Sign Up
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {["name", "email", "password", "confirmPassword", "dob", "contact"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                  {field === "dob"
                    ? "Date of Birth"
                    : field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={
                    field.includes("password")
                      ? "password"
                      : field === "email"
                      ? "email"
                      : field === "dob"
                      ? "date"
                      : field === "contact"
                      ? "tel"
                      : "text"
                  }
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold transition-all"
            >
              Create Account
            </motion.button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-black font-medium hover:underline transition">
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;
