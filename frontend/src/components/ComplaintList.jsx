import React, { useEffect, useState } from "react";
import service from "../http/service"; // Import your Axios instance
import { ImLocation } from "react-icons/im";
import { TbMessageReport } from "react-icons/tb";
import ReportForm from "./ReportForm";

// ComplaintCard Component
const ComplaintCard = ({
  title,
  description,
  location,
  createdAt,
  createdBy,
  upvotes,
  downvotes,
  commentsCount,
  id,
}) => {
  const [comment, setComment] = useState("");
  const [report, setReport] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [reportForm, setReportForm] = useState(false);

  const handleupvote = async (e) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await service.post(
        `/issues/upvoteIssue/${id}`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Upvote successful", response.data);
    } catch (error) {
      console.log("Error upvoting issue", error);
    }
  };
  const handledownvote = async (e) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await service.post(
        `/issues/downvoteIssue/${id}`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("downvote successful", response.data);
    } catch (error) {
      console.log("Error upvoting issue", error);
    }
  };

  const handlecomment = async (e) => {
    e.preventDefault();
    // console.log(comment);
    const response = await service.post(
      `/issues/commentIssue/${id}`,
      { comment: comment },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      alert("Comment submitted successfully");
      setComment("");
    }
  };

  const handlereport = async (e) => {
    e.preventDefault();
    const response = await service.post(
      `/issues/reportIssue/${id}`,
      {
        report: report,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      alert("Report submitted successfully");
      setReport("");
      return;
    } else {
      alert("Report not submitted");
    }
  };
  return (
    <div className="w-[90%] md:w-[70%] mx-auto bg-blue-50 shadow-lg rounded-lg overflow-hidden my-4">
      <div className="px-4 py-2">
        {/* Title and Location */}
        <div className="flex justify-between">
          <h2 className="text-md font-semibold text-gray-800">{title}</h2>
          <span className="flex text-sm font-semibold text-gray-500 text-right">
            <ImLocation />` {location}
          </span>
        </div>
        {/* Description */}
        <div className="flex justify-between items-center">
          <p className="mt-1 w-[80%] ml-2 text-sm font-normal text-gray-800">
            {description}
          </p>
          <TbMessageReport
            onClick={() => setReportForm(!reportForm)}
            className="text-red-600 font-extrabold text-xl cursor-pointer"
          />
        </div>
        {/* Created By and Date */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="text-gray-600">
            <span>created by: </span>
            <span className="font-medium">{createdBy}</span>
          </div>
          <div className="text-sm text-gray-800">
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
        {/* Upvote and Downvote Buttons */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <button
            onClick={handleupvote}
            className="flex items-center text-green-500 hover:text-green-700"
          >
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
          </button>
          <button className="flex items-center text-blue-500 hover:text-blue-700">
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
                d="M8 10h8m-4-4h4m-2 8h2m-6 0h.01M8 14h.01M4 6h16M4 6v14l4-4h12"
              />
            </svg>
            Comments ({commentsCount})
          </button>
          <button
            onClick={handledownvote}
            className="flex items-center text-red-500 hover:text-red-700"
          >
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
          </button>
        </div>
        {/* Comment Section */}
        <form action="" onSubmit={handlecomment}>
          <div className="mt-4 flex">
            <input
              type="text"
              value={comment}
              id="comment"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full text-sm border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="ml-4 bg-yellow-300 text-gray-800 text-sm font-semibold px-4 py-1 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            >
              submit
            </button>
          </div>
        </form>
      </div>
      <ReportForm
        isOpen={reportForm}
        onClose={() => setReportForm(!reportForm)}
        id={id}
      />
    </div>
  );
};

// ComplaintList Component
const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await service.get("/issues/allissues", {
          // headers: {
          //   Authorization: `${localStorage.getItem("token")}`,
          // },
        }); // Adjust endpoint as necessary
        setComplaints(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Failed to fetch complaints");
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading)
    return (
      <p className="text-xl text-white font-semibold text-center">Loading...</p>
    );
  if (error)
    return <p className="text-xl text-red-700 font-semibold">{error}</p>;

  return (
    <div className="min-h-[87vh]">
      {complaints.map((complaint) => (
        <ComplaintCard
          key={complaint._id}
          title={complaint.title}
          location={complaint.location}
          description={complaint.description}
          createdAt={complaint.createdAt}
          createdBy={complaint.complainer}
          upvotes={complaint.upvotes}
          downvotes={complaint.downvotes}
          commentsCount={complaint.comments.length}
          id={complaint._id}
        />
      ))}
    </div>
  );
};

export default ComplaintList;
