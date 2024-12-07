import React, { useState } from "react";
import service from "../http/service";
import Navbar1 from "./Navbar1";
import { useNavigate } from "react-router-dom";



const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !name || !password) {
      alert("Please fill out all fields.");
      return;
    }
    setLoading(true);
    // Additional validation can be added here (e.g., email format, password strength)

    // Call the onSubmit function passed as a prop

    try {
      const response = await service.post("/users/register", {
        email: email, // Ensure these match your backend expectations
        name: name,
        password: password,
      });
      setLoading(false);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate('/login');
    } catch (error) {
      console.error("Error during signup:", error.response.data); // Check response data for details
      setLoading(false);
    }

    // Reset form fields after submission
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1b3c] to-[#2d162d] flex flex-col">
      {/* Navbar */}
      <Navbar1 />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-11/12 max-w-md md:w-1/3 bg-gradient-to-br from-[#0e1b3c] to-[#2d162d] shadow-lg rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1 border border-gray-600 rounded-md bg-[#1e1e1e] text-white focus:outline-none focus:ring-1 focus:ring-yellow-300"
                required
              />
            </div>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1 border border-gray-600 rounded-md bg-[#1e1e1e] text-white focus:outline-none focus:ring-1 focus:ring-yellow-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1 border border-gray-600 rounded-md bg-[#1e1e1e] text-white focus:outline-none focus:ring-1 focus:ring-yellow-300"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black font-semibold text-md px-4 py-1 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            >
              Sign Up
            </button>
            <p className="mt-4 text-sm ">
              already Registered?{"  "}
              <a
                href="/login"
                className="text-yellow-300 hover:text-yellow-400 font-semibold "
              >
                Login!
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
