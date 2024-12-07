import React, { useState } from "react";
import service from "../http/service";

const RaiseComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [issueType, setIssueType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !location || !description || !issueType) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true); // Set loading state

    try {
      const response = await service.post(
        "/issues/createIssue",
        {
          title,
          location,
          description,
          type: issueType,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Complaint submitted successfully");
        // Reset form fields
        setTitle("");
        setLocation("");
        setDescription("");
      }
    } catch (error) {
      setError("Failed to submit complaint. Please try again.");
      console.error("Error submitting complaint:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="h-full bg-opacity-50">
      <div className="w-[90%] md:w-[60%] lg:w-[40%] text-white mx-auto bg-[#1c1a41] shadow-xl rounded-lg overflow-hidden my-4 p-8">
        <h2 className="text-xl font-bold mb-4">Raise Your Issue</h2>
        <form onSubmit={handleSubmit}>
          {/* Issue Type Dropdown */}
          <div className="mb-4 text-sm">
            <label className="block font-semibold mb-2" htmlFor="issueType">
              Issue Type
            </label>
            <select
              id="issueType"
              value={issueType}
              defaultValue={"service"}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-3 py-1 bg-[#1e1e1e] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              <option value="service">Service</option>
              <option value="corrouption">Corruption</option>
              <option value="others">Others</option>
            </select>
          </div>
          {/* Title Field */}
          <div className="mb-4 text-sm">
            <label className="block font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter title (e.g., Flooded Street)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-1 bg-[#1e1e1e] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          {/* Location Field */}
          <div className="mb-4 text-sm">
            <label className="block font-semibold mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter location (e.g., Sec 10, Faridabad)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-1 bg-[#1e1e1e] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          {/* Description Field */}
          <div className="mb-4 text-sm">
            <label className="block font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-1 bg-[#1e1e1e] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className="w-full  bg-yellow-300 text-black text-sm font-semibold px-4 py-1 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-500"
          >
            {loading ? "Submitting..." : "submit Issue"}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaintForm;
