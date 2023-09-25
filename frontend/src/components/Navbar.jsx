import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/OneHealthPNG.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/patient/logout",
        null
      );

      if (response.status === 200) {
        // Logout successful, clear user info from local storage and redirect to the login page
        localStorage.removeItem("token");
        navigate("/patient/login"); // Assuming you're using Reach Router for navigation
      } else {
        // Handle server-side errors
        throw new Error(response.data.message);
      }
    } catch (error) {
      // Handle any network or other client-side errors
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <>
      <div className="w-full h-[70px] flex justify-between items-center px-4 bg-[#4867D6] text-white  ">
        <img src={logo} width="200px" />
        <div>
          <ul className="hidden md:flex">
            <li className="hover:text-[#4867D6]">
              <Link to="/" duration={500}>
                Home
              </Link>
            </li>
            <li className="hover:text-[#4867D6]">
              <Link to="/create" duration={500}>
                Book an Appointment
              </Link>
            </li>
            <li className="hover:text-[#4867D6]">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
