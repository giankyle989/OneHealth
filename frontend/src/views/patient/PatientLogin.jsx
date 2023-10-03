import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/patient/login", { email, mobileNumber,password })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        console.log("Logged in successfully")
        navigate("/");
      })
      .catch((err) => console.log("Error: " + err));
  };
  return (
    <>
    <div className="h-screen">
    <Navbar/>
      <div className="flex justify-center items-center">
        <form
          className="absolute top-1/4  shadow-2xl p-8 space-y-4 rounded-lg bg-slate-200"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center font-bold text-2xl text-[#4867d6]">Login</h1>
          <div>
            <label className="block ml-2">Email or Mobile Number</label>
            <input
              className="p-4 rounded-full text-sm mt-2 w-full"
              value={email || mobileNumber}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email or mobile number"
            />
          </div>
          <div>
            <label className="block ml-2">Password</label>
            <input
              className="p-4 rounded-full text-sm mt-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="text-xs text-right font-light">
          <a href="#" className="hover:text-slate-600">Forgot your password?</a>
          </div>




          <button className="w-full border p-2 rounded-full text-white bg-[#4867D6]">
            Submit
          </button>
        <p>Don't have an account? Register <a href="#" className="text-[#4867D6]"> here</a></p>
        </form>
      </div>
    </div>
    
    </>
  );
};

export default PatientLogin;
