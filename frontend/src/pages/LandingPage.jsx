import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6">
      <header className="w-full flex justify-between items-center py-4 px-8 border-b border-gray-700">
        <h1 className="text-3xl font-bold">VoteNow</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="hover:text-gray-400 cursor-pointer">Home</li>
            <li className="hover:text-gray-400 cursor-pointer">Features</li>
            <li className="hover:text-gray-400 cursor-pointer">About</li>
            <li className="hover:text-gray-400 cursor-pointer">Contact</li>
          </ul>
        </nav>
      </header>
      
      <main className="flex flex-col items-center text-center mt-16">
        <h2 className="text-4xl font-extrabold">Secure & Transparent Voting System</h2>
        <p className="text-gray-400 mt-4 max-w-2xl">
          A modern and reliable online voting platform ensuring transparency, security, and accessibility for all users.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-500 transition">
          Get Started
        </button>
      </main>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Secure Voting</h3>
          <p className="text-gray-400 mt-2">Blockchain technology ensures your vote remains safe and unaltered.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Transparency</h3>
          <p className="text-gray-400 mt-2">Votes are recorded and verifiable in real-time for complete trust.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Accessibility</h3>
          <p className="text-gray-400 mt-2">Vote from anywhere, anytime, using our user-friendly platform.</p>
        </div>
      </section>

      <footer className="mt-16 py-6 w-full text-center border-t border-gray-700">
        <p className="text-gray-500">&copy; 2025 VoteNow. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
