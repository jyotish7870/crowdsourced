import React, { useState, useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import service from "../http/service";

const UserComplaintCard = ({
  title,
  location,
  description,
  applicationStatus,
  createdAt,
  upvotes,
  downvotes,
  onDelete,
}) => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-2">
      <div className="p-4">
        {/* Title, location and Delete */}
        <div className=" flex justify-between items-center">
          <h2 className="text-md font-semibold text-gray-800">{title}</h2>
          <div className="flex gap-4">
            <span className="flex items-center text-sm font-semibold text-gray-500">
              <ImLocation />
              {location}
            </span>
            <button
              onClick={onDelete}
              className="text-red-600 font-extrabold text-xl hover:scale-125"
            >
              <MdDelete />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-center justify-between">
          <p className="w-[80%] ml-2 text-gray-600 text-sm font-normal">
            {description}
          </p>
          <div className="text-sm font-normal text-gray-500">
            {/* Created at: */}
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Application Status */}
        {/* Upvote and Downvote Buttons */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex justify-between">
            <span
              className={`px-2 py-1 rounded-sm font-medium ${
                applicationStatus === "open"
                  ? "bg-yellow-100 text-yellow-800"
                  : applicationStatus === "resolved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {applicationStatus}
            </span>
          </div>
          <p className="flex items-center text-green-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
            Upvote ({upvotes})
          </p>
          <p className="flex items-center text-red-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Downvote ({downvotes})
          </p>
        </div>
      </div>
    </div>
  );
};

const UserComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await service.get("/users/allissues", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setComplaints(response.data);
      } catch (err) {
        setError("Failed to fetch complaints.");
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete an issue.");
        return;
      }
      // console.log(id);
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this issue?"
      );
      if (!confirmDelete) return;

      // Send request to backend with issue ID in the URL
      const response = await service.delete(`/users/deleteIssue/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      // console.log(response);

      if (response.status === 200) {
        alert("Issue deleted successfully.");
        // Optionally, refresh or update the complaint list after deletion
      } else {
        alert("Failed to delete issue. Please try again.");
      }
      setRefresh(!refresh);
    } catch (error) {
      console.log("Error deleting issue:", error);
      // alert("Failed to delete issue. Please try again.");
    }
  };

  if (loading)
    return <div className="text-xl text-white font-semibold">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-lg font-semibold">{error}</div>;

  return (
    <div className="mt-4">
      {complaints.map((complaint) => (
        <UserComplaintCard
          key={complaint._id}
          title={complaint.title}
          location={complaint.location}
          description={complaint.description}
          applicationStatus={complaint.status}
          createdAt={complaint.createdAt}
          upvotes={complaint.upvotes}
          downvotes={complaint.downvotes}
          onDelete={() => handleDelete(complaint._id)}
        />
      ))}
    </div>
  );
};

export default UserComplaintList;
