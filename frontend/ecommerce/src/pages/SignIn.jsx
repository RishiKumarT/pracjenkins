import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar2 from "../components/Navbar2";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);

        toast.success("Login Successful!", {
          autoClose: 1000,
          onClose: () => navigate("/home2"),
        });
      } else {
        toast.error(data.message || "Login Failed!", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid Credentials. Try again.", { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar2 />
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f5f5] to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-wide">
            SIGN IN
          </h1>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-black transition duration-200">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full bg-black text-white py-2 rounded-lg font-semibold transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-black font-medium hover:underline transition">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
