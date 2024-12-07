import React, { useEffect, useState } from "react";
import service from "../http/service";
import Navbar1 from "./Navbar1";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    // Call the onSubmit function passed as a prop
    try {
      const response = await service.post("/users/login", {
        email: email, // Ensure these match your backend expectations
        password: password,
      });
      setLoading(false);
      console.log(response.data);
      localStorage.clear();
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location = "/";
    } catch (error) {
      console.error("Error during login:", error.response.data); // Check response data for details
      setLoading(false);
    }

    // Reset form fields after submission
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1b3c] to-[#2d162d] flex flex-col">
      {/* Navbar */}
      <Navbar1 />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-11/12 max-w-md md:w-1/3 bg-gradient-to-br from-[#0e1b3c] to-[#2d162d] shadow-lg rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
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
              disabled={loading}
              className="w-full bg-yellow-300 text-black font-semibold text-md  px-4 py-1 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            >
              {loading ? "Logging in..." : "LogIn"}
            </button>
            <p className="mt-4 text-sm">
              New User?{" "}
              <a
                href="/register"
                className="text-yellow-300 hover:text-yellow-400 font-semibold text-center"
              >
                Register Here!
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
