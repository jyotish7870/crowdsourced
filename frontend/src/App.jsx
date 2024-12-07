import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import ComplaintCard from "./components/ComplaintCard";
import RaiseComplaintForm from "./components/RaiseIssue";
import UserComplaintCard from "./components/UserComplaintList";
import LoginForm from "./components/LogIn";
import SignupForm from "./components/SignUp";
import ComplaintList from "./components/ComplaintList";
import Landing from "./components/Landing";
import MyAccount from "./components/MyProfile";
import Discussion from "./components/Discussion";

function App() {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
          </Routes>
        </Router>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
        <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<ComplaintList />} />
          <Route path="/raise-complaint" element={<RaiseComplaintForm />} />
          <Route path="/your-complaints" element={<UserComplaintCard />} />
          <Route path="/myprofile" element={<MyAccount />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="*" element={<ComplaintList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
