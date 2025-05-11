import React, { useState } from "react";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step transition animation
  const boxVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f5f5] to-gray-100 flex items-center justify-center px-4">
      {step <= 2 ? (
        <motion.div
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md"
        >
          {/* Header */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6 tracking-wide">
            Forgot Password
          </h1>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 1) {
                // Simulate OTP send
                setStep(2);
              } else if (step === 2) {
                // Simulate OTP verify
                setStep(3);
              }
            }}
          >
            {/* Step 1: Email */}
            {step >= 1 && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <motion.div
                variants={boxVariants}
                initial="hidden"
                animate="visible"
              >
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </motion.div>
            )}

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold transition-all"
            >
              {step === 1 ? "Verify" : "Change Password"}
            </motion.button>
          </form>
        </motion.div>
      ) : (
        // Step 3: New password form
        <motion.div
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6 tracking-wide">
            Set New Password
          </h1>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle final password update logic here
              alert("Password successfully changed!");
            }}
          >
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold transition-all"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ForgotPassword;
