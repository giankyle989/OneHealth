import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const HospitalLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Admin')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()


    
    if (role === "Admin"){
      axios.post("http://localhost:5000/api/admin/login", {email, password} )
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        console.log("Login Successfully as Admin")
        navigate('/hospital/admin')
      })
      .catch((err) => console.log("Error: " + err))
    }
    else if (role === "Doctor"){
      axios.post("http://localhost:5000/api/doctor/login", {email, password} )
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        console.log("Login Successfully as Doctor")
        navigate('/hospital/doctor/appointments')
      })
      .catch((err) => console.log("Error: " + err))
    }
    else if (role === "Nurse"){
      console.log("This is nurse")
    }



  }
  return (
    <>
          <div className="h-screen flex justify-center items-center">
        <form
          className="shadow-2xl p-8 space-y-4 rounded-lg bg-slate-200"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center font-bold text-2xl text-[#4867d6]">Login</h1>
          <div>
            <label className="block ml-2">Email or Mobile Number</label>
            <input
              className="p-4 rounded-full text-sm mt-2 w-full"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email or mobile number"
            />
          </div>
          <div>
            <label className="block ml-2">Password</label>
            <input
              className="p-4 rounded-full text-sm mt-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block ml-2">User Role:</label>
            <select
              className="p-4 rounded-full text-sm mt-2 w-full"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Staff">Staff</option>
            </select>
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
    </>
  )
}

export default HospitalLogin