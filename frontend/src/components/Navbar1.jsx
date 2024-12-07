import React from "react";

const Navbar1 = () => {
  return (
    <nav className="sticky top-0 bg-opacity-80 bg-[#0e1b3c] text-white border-b border-gray-600 w-full z-50">
      <div className="w-full font-lora max-w-screen-lg mx-auto flex items-center justify-between py-3 px-2">
        <a href="/" className="text-xl font-bold">
          VoicesUnite
        </a>
        <div className="flex space-x-2">
          <a
            href="/login"
            className="bg-black text-white text-sm border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-1 rounded-lg hover:bg-gray-800"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-[#05166b22] text-white text-sm border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-1 rounded-lg hover:bg-gray-800"
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
