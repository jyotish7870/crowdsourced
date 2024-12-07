// LoginModal.js
import React, { useState } from "react";
import service from "../http/service";

const ReportForm = ({ isOpen, onClose, id }) => {
  if (!isOpen) return null;
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post(
        `/issues/reportIssue/${id}`,
        {
          report: message,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Report submitted", response.data);
      setMessage("");
      alert("Report submitted successfully");
      onClose();
    } catch (error) {
      console.log("Error reporting issue", error);
      alert("Report not submitted, something caught error");
      onClose();
    }
  };
  // Remove the extra closing curly brace

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-[#1c1a41] z-20 text-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
        <h2 className="text-xl font-bold text-red-700 mb-4 font-lora">
          Report issue
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2">message</label>
            <textarea
              rows={5}
              type="text"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1e1e1e] text-white focus:outline-none focus:ring-1 focus:ring-yellow-300"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black text-sm font-semibold px-4 py-1 rounded-lg hover:bg-yellow-400"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-2xl font-extrabold hover:scale-110"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ReportForm;
