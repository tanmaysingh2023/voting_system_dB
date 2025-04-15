import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const UserLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const storedUser = localStorage.getItem("voterUser") ? localStorage.getItem("voterUser") : null;
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                localStorage.setItem("voterUser", JSON.stringify(data.user));
                navigate("/dashboard");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong.");
        }
    };


    return (
        <div className="bg-[#141827] text-white min-h-screen flex flex-col items-center px-6 pt-20">
            <motion.h2
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="text-4xl font-extrabold mb-8"
            >
                Welcome Back
            </motion.h2>

            <motion.form
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-lg space-y-6"
            >
                <div>
                    <label className="block text-gray-400 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 py-2 rounded-lg font-semibold text-lg hover:bg-blue-500 transition"
                >
                    Log In
                </motion.button>

                <p className="text-center text-sm text-gray-400 mt-2">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => navigate("/user-signup")}
                    >
                        Sign up here
                    </span>
                </p>

                {/* Admin Login Button */}
                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate("/admin-login")}
                        className="text-sm bg-gray-800 text-blue-400 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200"
                    >
                        Admin Login
                    </button>
                </div>
            </motion.form>
        </div>
    );
};

export default UserLogin;