import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LandingPage = () => {
    return (
        <div className="bg-[#141827] text-white min-h-screen flex flex-col items-center px-6 gap-10">
            {/* Navbar */}
            <header className="w-full flex justify-between items-center py-4 px-8 border-b border-gray-700">
                <h1 className="text-3xl font-bold">VoteNow</h1>
                <nav>
                    <ul className="flex space-x-6">
                        {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
                            <motion.li
                                key={item}
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: index * 0.2 }}
                                className="hover:text-gray-400 cursor-pointer"
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="flex gap-8 justify-between items-center w-[80%]">
                <div className="flex flex-col items-center text-center mt-16">
                    <motion.h2
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl font-extrabold"
                    >
                        Secure & Transparent Voting System
                    </motion.h2>
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 mt-4 max-w-2xl"
                    >
                        A modern and reliable online voting platform ensuring transparency, security, and accessibility for all users.
                    </motion.p>
                    <motion.button
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                        className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-500 transition"
                    >
                        Get Started
                    </motion.button>
                </div>
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                    className="w-[650px]">
                    <img src="vote-final.jpg" alt="" />
                </motion.div>
            </main>

            {/* Feature Section */}
            <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {["Secure Voting", "Transparency", "Accessibility"].map((title, index) => (
                    <motion.div
                        key={title}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.3 }}
                        className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition"
                    >
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <p className="text-gray-400 mt-2">
                            {title === "Secure Voting" && "Blockchain technology ensures your vote remains safe and unaltered."}
                            {title === "Transparency" && "Votes are recorded and verifiable in real-time for complete trust."}
                            {title === "Accessibility" && "Vote from anywhere, anytime, using our user-friendly platform."}
                        </p>
                    </motion.div>
                ))}
            </section>

            {/* Footer */}
            <footer className="py-6 w-full text-center border-t border-gray-700">
                <p className="text-gray-500">&copy; 2025 VoteNow. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;