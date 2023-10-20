import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";

const FindPatient = () => {
  const [userRole, setUserRole] = useState('staff');
  return (
    <>
      <div className="flex w-screen">
      <Sidebar userRole={userRole}/>
        <div className=" w-full ml-8">
          <div className='flex flex-col items-center'>
            <h1 className="text-center text-2xl font-bold">Patient</h1>
            <div className="flex">
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
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border  text-center p-2">PAT-001</td>
                    <td className="border  text-center p-2">Juan</td>
                    <td className="border  text-center p-2">email@email.com</td>
                    <td className="border  text-center p-2">515-6322</td>
                  </tr>
                  <tr>
                    <td className="border  text-center p-2">PAT-003</td>
                    <td className="border  text-center p-2">Mary</td>
                    <td className="border  text-center p-2">email@email.com</td>
                    <td className="border  text-center p-2">515-6322</td>
                  </tr>
                  <tr>
                    <td className="border  text-center p-2">PAT-003</td>
                    <td className="border  text-center p-2">Pedro</td>
                    <td className="border  text-center p-2">email@email.com</td>
                    <td className="border  text-center p-2">515-6322</td>
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

export default FindPatient