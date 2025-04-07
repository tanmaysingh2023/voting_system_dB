import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage2 = () => {
  // State for toggling between voter and admin
  const [userType, setUserType] = useState("voter"); // "voter" or "admin"
  
  // State for toggling between login and signup
  const [isLogin, setIsLogin] = useState(true);

  // Voter form state
  const [voterForm, setVoterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    voterId: "",
  });

  // Admin form state
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    adminId: "",
  });

  // Handle voter form changes
  const handleVoterChange = (e) => {
    setVoterForm({ ...voterForm, [e.target.name]: e.target.value });
  };

  // Handle admin form changes
  const handleAdminChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "voter") {
      console.log("Voter form submitted:", voterForm);
    } else {
      console.log("Admin form submitted:", adminForm);
    }
  };

  // Animation variants
  const containerVariants = {
    voter: {
      backgroundColor: "#141827",
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    admin: {
      backgroundColor: "white",
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  // Updated form animation variants with the correct directional logic
  const formVariants = {
    // Voter form movement
    voterInitial: { 
      x: 500, // Enter from the right
      opacity: 0 
    },
    voterAnimate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" } 
    },
    voterExit: { 
      x: 500, // Exit to the right
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" } 
    },
    
    // Admin form movement
    adminInitial: { 
      x: -500, // Enter from the left
      opacity: 0 
    },
    adminAnimate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" } 
    },
    adminExit: { 
      x: -500, // Exit to the left
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" } 
    }
  };

  // Toggle slider animation
  const sliderVariants = {
    voter: {
      x: 0,
      backgroundColor: "#3B82F6", // Blue for voter
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    admin: {
      x: "100%",
      backgroundColor: "#141827", // Dark for admin
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center p-4"
      variants={containerVariants}
      animate={userType}
      initial={false}
    >
      <div className="w-full max-w-md">
        {/* Toggle between Voter and Admin with animated slider */}
        <div className="bg-gray-100 p-1 rounded-lg flex mb-8 relative">
          {/* Animated background slider */}
          <motion.div
            className="absolute top-1 bottom-1 w-1/2 rounded-md z-0"
            variants={sliderVariants}
            animate={userType}
            initial={false}
          />
          
          {/* Toggle buttons */}
          <button
            className={`w-1/2 py-2 rounded-md text-center font-medium transition-colors duration-300 z-10 relative hover:cursor-pointer ${
              userType === "voter" ? "text-white" : "text-gray-700"
            }`}
            onClick={() => setUserType("voter")}
          >
            Voter
          </button>
          <button
            className={`w-1/2 py-2 rounded-md text-center font-medium transition-colors duration-300 z-10 relative hover:cursor-pointer ${
              userType === "admin" ? "text-white" : "text-gray-700"
            }`}
            onClick={() => setUserType("admin")}
          >
            Admin
          </button>
        </div>

        <AnimatePresence mode="wait">
          {userType === "voter" ? (
            <motion.div
              key="voter-form"
              initial="voterInitial"
              animate="voterAnimate"
              exit="voterExit"
              variants={formVariants}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Voter {isLogin ? "Login" : "Signup"}
                </h2>
                <p className="mt-2 text-gray-400">
                  Access your voting account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={voterForm.name}
                      onChange={handleVoterChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={voterForm.email}
                    onChange={handleVoterChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">
                      Voter ID
                    </label>
                    <input
                      type="text"
                      name="voterId"
                      value={voterForm.voterId}
                      onChange={handleVoterChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your voter ID"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={voterForm.password}
                    onChange={handleVoterChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={voterForm.confirmPassword}
                      onChange={handleVoterChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-blue-400 hover:text-blue-300 hover:cursor-pointer">
                      Forgot Password?
                    </button>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors hover:cursor-pointer"
                >
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-400 hover:text-blue-300 font-medium hover:cursor-pointer"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="admin-form"
              initial="adminInitial"
              animate="adminAnimate"
              exit="adminExit"
              variants={formVariants}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#141827]">
                  Admin {isLogin ? "Login" : "Signup"}
                </h2>
                <p className="mt-2 text-gray-500">
                  Access your administrator account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={adminForm.name}
                      onChange={handleAdminChange}
                      className="w-full p-3 bg-white border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={adminForm.email}
                    onChange={handleAdminChange}
                    className="w-full p-3 bg-white border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Admin ID
                    </label>
                    <input
                      type="text"
                      name="adminId"
                      value={adminForm.adminId}
                      onChange={handleAdminChange}
                      className="w-full p-3 bg-white border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your admin ID"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={adminForm.password}
                    onChange={handleAdminChange}
                    className="w-full p-3 bg-white border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={adminForm.confirmPassword}
                      onChange={handleAdminChange}
                      className="w-full p-3 bg-white border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}
                
                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-500 hover:cursor-pointer">
                      Forgot Password?
                    </button>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-[#141827] hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors hover:cursor-pointer"
                >
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-500">
                  {isLogin ? "Don't have an admin account? " : "Already have an admin account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-500 font-medium hover:cursor-pointer"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AuthPage2;