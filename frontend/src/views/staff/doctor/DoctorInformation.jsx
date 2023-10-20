import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";

const DoctorInformation = () => {
  const [userRole, setUserRole] = useState('staff');
  return (
    <>
      <div className="flex w-screen">
      <Sidebar userRole={userRole}/>
        <div className=" w-full ml-8">
          <div>
            <h1 className="text-center text-2xl font-bold">Doctors Information</h1>
          </div>
          <div className="mt-32">
            <div className="p-4">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Department</th>
                    <th className="border p-2">Specialization</th>
                    <th className="border p-2">Clinic Address</th>
                    <th className="border p-2">Clinic Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border  text-center p-2">Juan</td>
                    <td className="border  text-center p-2">OB-GYN</td>
                    <td className="border  text-center p-2">Obstetrician</td>
                    <td className="border  text-center p-2">123 Street</td>
                    <td className="border  text-center p-2">515-6322</td>
                  </tr>
                  <tr>
                    <td className="border  text-center p-2">Juan</td>
                    <td className="border  text-center p-2">Pediatric</td>
                    <td className="border  text-center p-2">Cardiology</td>
                    <td className="border  text-center p-2">123 Street</td>
                    <td className="border  text-center p-2">515-6322</td>
                  </tr>
                  <tr>
                    <td className="border  text-center p-2">Juan</td>
                    <td className="border  text-center p-2">General Medicine</td>
                    <td className="border  text-center p-2">Geriatrician</td>
                    <td className="border  text-center p-2">123 Street</td>
                    <td className="border  text-center p-2">515-6322</td>
                  </tr>
                  <tr>
                    <td className="border  text-center p-2">Juan</td>
                    <td className="border  text-center p-2">Internal Medicine</td>
                    <td className="border  text-center p-2">Pulmonology</td>
                    <td className="border  text-center p-2">123 Street</td>
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

export default DoctorInformation