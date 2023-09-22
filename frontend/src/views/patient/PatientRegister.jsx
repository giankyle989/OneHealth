import React from "react";
import Navbar from "../../components/Navbar";

const PatientRegister = () => {
  return (
    <>
    <Navbar/>
      <div className="flex justify-center">
        <div className="lg:w-2/3">
          <form className="p-2">
            <h1 className="text-[#4867D6] font-bold text-2xl text-center">
              Register Form
            </h1>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                <label className="ml-2"> First Name</label>
                <label className="ml-2"> Last Name</label>
                <input
                  type="text"
                  className="border-2 border-slate-300 rounded-full p-2"
                  placeholder="Enter your First Name"
                />
                <input
                  type="text"
                  className="border-2 border-slate-300 rounded-full p-2"
                  placeholder="Enter your Last Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                <label className="ml-2"> Gender</label>
                <label className="ml-2"> Birthdate</label>
                <select
                  type="text"
                  className="border-2 border-slate-300 rounded-full p-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="date"
                  className="border-2 border-slate-300 rounded-full p-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-x-2 gap-y-2 ">
                <label className="ml-2"> Email</label>
                <label className="ml-2"> Mobile Num.</label>
                <label className="ml-2"> Landline</label>
                <input
                  type="email"
                  className="border-2 border-slate-300 rounded-full p-2 text-xs"
                  placeholder="Enter your Email"
                />
                <input
                  type="text"
                  className="border-2 border-slate-300 rounded-full p-2 text-xs"
                  placeholder="Enter Mobile #"
                />
                <input
                  type="text"
                  className="border-2 border-slate-300 rounded-full p-2 text-xs"
                  placeholder="Enter Landline #"
                />
              </div>
              <div className="mt-4">
                <h1 className="font-bold">Complete Address</h1>
                <div className="grid grid-cols-3 gap-x-2 gap-y-2 ">
                  <label className="ml-2"> Address Line 1</label>
                  <label className="ml-2"> Address Line 2</label>
                  <label className="ml-2"> Barangay</label>
                  <input
                    type="email"
                    className="border-2 border-slate-300 rounded-full p-2 text-xs"
                    placeholder="Street Address"
                  />
                  <input
                    type="text"
                    className="border-2 border-slate-300 rounded-full p-2 text-xs"
                    placeholder="Apt, suite, etc."
                  />
                  <input
                    type="text"
                    className="border-2 border-slate-300 rounded-full p-2 text-xs"
                    placeholder="Enter Barangay"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                  <label className="ml-2">City</label>
                  <label className="ml-2">Province</label>
                  <input
                    type="text"
                    className="border-2 border-slate-300 rounded-full p-2"
                    placeholder="Enter your City"
                  />
                  <input
                    type="text"
                    className="border-2 border-slate-300 rounded-full p-2"
                    placeholder="Enter your Province"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                <label className="ml-2"> Password</label>
                <label className="ml-2"> Confirm Password</label>
                <input
                  type="password"
                  className="border-2 border-slate-300 rounded-full p-2"
                  placeholder="Enter your Password"
                />
                <input
                  type="password"
                  className="border-2 border-slate-300 rounded-full p-2"
                  placeholder="Enter your Confirm Password"
                />
              </div>
            </div>
            <div className="text-center bg-[#4867D6] p-4 rounded-full text-white font-semibold mt-4">
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PatientRegister;
