import React, { useEffect, useState } from "react";
import service from "../http/service.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// Sample data for complaint trends

const complaintTrendData = [
  { month: "Jan", complaints: 5 },
  { month: "Feb", complaints: 3 },
  { month: "Mar", complaints: 8 },
  { month: "Apr", complaints: 2 },
  { month: "May", complaints: 6 },
];

// Sample data for category distribution
const categoryData = [
  { name: "Corruption", value: 45 },
  { name: "Service Issues", value: 30 },
  { name: "Other", value: 25 },
];

// Sample comparative stats
const comparativeStats = {
  userComplaints: 25,
  avgComplaints: 18,
  percentile: 75,
};
// Initialize total with default values

// Sample data for the pie chart

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const UserDashboard = () => {
  const [total, setTotal] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await service.get("/users/userdashboard", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(typeof response.data.data);
      setTotal(response.data.data);
    };
    fetchDetails();
  }, []);
  const issuesData = [
    { name: "resolved Issue", value: total.resolvedIssues },
    { name: "rejected Issues", value: total.rejectedIssues },
    { name: "open issue", value: total.openIssues },
  ];
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h2>

      {/* User Activity Overview */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Your Activity Overview</h3>
        <div className="flex flex-col md:flex-row md:space-x-2 justify-between">
          <div className="bg-blue-100 p-2 rounded-lg shadow-md w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-md font-semibold">Total Complaints Filed</h4>
            <p className="text-xl font-bold">{total.totalIssues}</p>
          </div>
          <div className="bg-yellow-100 p-2 rounded-lg shadow-md w-full md:w-1/3">
            <h4 className="text-md font-semibold">Open Complaints</h4>
            <p className="text-xl font-bold">{total.openIssues}</p>
          </div>
          <div className="bg-red-100 p-2 rounded-lg shadow-md w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-md font-semibold">Rejected Complaints</h4>
            <p className="text-xl font-bold">{total.rejectedIssues}</p>
          </div>
          <div className="bg-green-100 p-2 rounded-lg shadow-md w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-md font-semibold">Resolved Complaints</h4>
            <p className="text-xl font-bold">{total.resolvedIssues}</p>
          </div>
        </div>
      </section>

      {/* Complaint Trends */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Complaint Trends (Last 5 Months)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={complaintTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="complaints" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* issue status distribution */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Issue Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={issuesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Issue Type Distribution */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Issue Type Distribution (%)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Engagement Status */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Engagement Over Your Issues
        </h3>
        <div className="flex flex-col md:flex-row justify-between md:space-x-2">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-md font-semibold">Total upvotes</h4>
            <p className="text-lg font-bold">{total.totalUpvotes}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-md font-semibold">Total Downvotes</h4>
            <p className="text-lg font-bold">{total.totalDownvotes}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-md w-full md:w-1/3">
            <h4 className="text-md font-semibold">Total Comments</h4>
            <p className="text-lg font-bold">{total.totalComments}</p>
          </div>
          <div />
        </div>
      </section>

      {/* Comparative Stats */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Comparative Stats</h3>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <p className="text-md">
            You have filed{" "}
            <span className="font-bold">{comparativeStats.userComplaints}</span>{" "}
            complaints. The average number of complaints filed by other users is{" "}
            <span className="font-bold">{comparativeStats.avgComplaints}</span>.
          </p>
          <p className="mt-2">
            You rank in the{" "}
            <span className="font-bold">{comparativeStats.percentile}th</span>{" "}
            percentile of all users.
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
