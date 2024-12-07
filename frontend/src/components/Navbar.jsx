import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/";
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="sticky top-0 bg-[#0e1b3c] text-white border-b border-gray-600 w-full z-50">
      <div className="w-full lg:w-[70%] mx-auto flex items-center justify-between p-3 text-center">
        <a href="/" className="font-lora text-xl font-bold">
          VoicesUnite
        </a>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {!isMenuOpen ? (
              <RxHamburgerMenu className="font-semibold text-2xl" />
            ) : (
              <IoClose className="font-semibold text-2xl" />
            )}
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          <a
            href="/discussion"
            className="bg-[#05166b22] text-white text-sm font-semibold border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-1 rounded-lg hover:bg-gray-800"
          >
            Bat~Chit
          </a>
          <a
            href="/raise-complaint"
            className="bg-[#05166b22] text-white text-sm font-semibold border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-1 rounded-lg hover:bg-gray-800"
          >
            Raise Your Issue
          </a>
          <a
            href="/myprofile"
            className="flex gap-1 bg-[#05166b22] text-white text-sm border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-1 rounded-lg hover:bg-gray-800"
          >
            My Account
            <span className="flex items-center font-semibold text-md">
              <CgProfile />
            </span>
          </a>
          <button
            onClick={handleLogout}
            className="bg-black cursor-pointer text-white text-sm border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-1 rounded-lg hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[#0e1b3c] mx-4 text-center">
          <a
            href="/discussion"
            className="block bg-[#05166b22] text-white font-semibold border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Bat~Chit
          </a>
          <a
            href="/raise-complaint"
            className="block bg-[#05166b22] text-white font-semibold border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Raise Your Issue
          </a>
          <a
            href="/myprofile"
            className="flex items-center justify-center gap-1 bg-[#05166b22] text-white border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            My Account
            <span className="flex items-center font-semibold text-md">
              <CgProfile />
            </span>
          </a>
          <button
            onClick={handleLogout}
            className="bg-[#05166b22] w-full cursor-pointer text-white border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
