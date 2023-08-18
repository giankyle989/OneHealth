import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/patient/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        console.log("Logged in successfully")
        navigate("/");
      })
      .catch((err) => console.log("Error: " + err));
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <form
          className="border border-black p-8 space-y-4 rounded-2xl bg-slate-300"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Login</h1>
          <div>
            <label className="block">Email</label>
            <input
              className="border border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block">Password</label>
            <input
              className="border border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <button className="w-full border border-black rounded-md bg-sky-400">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PatientLogin;
