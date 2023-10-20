import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";

const FindAppointment = () => {
  const [userRole, setUserRole] = useState('staff');
  return (
    <>
      <div className="flex w-screen">
      <Sidebar userRole={userRole}/>
        <div className=" w-full ml-8">
          <div className='flex flex-col items-center'>
            <h1 className="text-center text-2xl font-bold">Appointments for today</h1>
            <div className="flex mt-4">
                <input 
                    type="text"
                    className="block px-4 py-2 text-sky-700 bg-white border rounded-full focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="ID or Name"
                />
                <button className="px-4 text-white bg-sky-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
          </div>
          <div className="mt-32">
            <div className="p-4">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Time</th>
                    <th className="border p-2">Appointment ID</th>
                    <th className="border p-2">Patient</th>
                    <th className="border p-2">Doctor</th>
                    <th className="border p-2">Department</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border  text-center p-2">09-23-23</td>
                    <td className="border  text-center p-2">09:00 AM</td>
                    <td className="border  text-center p-2">APPT-001</td>
                    <td className="border  text-center p-2">Juan</td>
                    <td className="border  text-center p-2">Doctor Pedro</td>
                    <td className="border  text-center p-2">Pediatrics</td>
                    <td className="border  text-center p-2">Initial Assess</td>
                    <td className="border  text-center p-2"></td>
                  </tr>
                  <tr>
                    <td className="border  text-center p-2">09-23-23</td>
                    <td className="border  text-center p-2">10:00 AM</td>
                    <td className="border  text-center p-2">APPT-002</td>
                    <td className="border  text-center p-2">Juan</td>
                    <td className="border  text-center p-2">Doctor Pedro</td>
                    <td className="border  text-center p-2">Pediatrics</td>
                    <td className="border  text-center p-2">Waiting in Reception Area</td>
                    <td className="border  text-center p-2"><button className='p-2 bg-[#4867D6] text-white rounded-md'>Update Status</button></td>
                  </tr>
                  <tr>
                    <td className="border  text-center p-2">09-23-23</td>
                    <td className="border  text-center p-2">09:00 AM</td>
                    <td className="border  text-center p-2">APPT-003</td>
                    <td className="border  text-center p-2">Juan</td>
                    <td className="border  text-center p-2">Doctor Pedro</td>
                    <td className="border  text-center p-2">Pediatrics</td>
                    <td className="border  text-center p-2">Upcoming</td>
                    <td className="border  text-center p-2"><button className='p-2 bg-[#4867D6] text-white rounded-md'>Check In</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FindAppointment