import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const RadTechNavigation = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    axios
      .post("http://localhost:5000/api/radTech/logout", null)
      .then((res) => {
        localStorage.removeItem("token");
        navigate("/hospital/auth/login");
      })
      .catch((err) => console.log("Error: " + err));
  };

  // Check if the token exists in local storage
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token; // Convert token to a boolean value

  return (
    <>
          <li className="">
        <Link to="/hospital/radtech">Dashboard</Link>
      </li>
      <li className="">
        <Link to="/hospital/radtech/tracker">Tracker</Link>
      </li>
      <li className="">
        <Link to="/hospital/radtech/scanner">Scanner</Link>
      </li>
      <li className="">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/hospital/auth/login">Login</Link>
        )}
      </li>
    </>
  );
};

export default RadTechNavigation;
