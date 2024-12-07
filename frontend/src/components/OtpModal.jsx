import React from "react";

const OtpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    alert("form submitted successfully");
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1c1a41] text-white p-6 rounded-lg w-11/12 md:w-1/4 relative">
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-md mb-2">OTP</label>
            <input
              type="number"
              placeholder="873456"
              min={100000}
              max={999999}
              id="name"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1e1e1e] text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400"
            >
              Verify OTP
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-4xl font-extrabold hover:scale-110"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
