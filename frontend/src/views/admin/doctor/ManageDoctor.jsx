import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";

const ManageDoctor = () => {
  const [userRole, setUserRole] = useState('admin');
  const [doctors, setDoctors] =useState([])
  
  const tokenObject = JSON.parse(localStorage.getItem("token"));
  //Get token string only
  const token = tokenObject.token;
  const username = tokenObject.name;
  const headerToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/doctor/get", headerToken)
      .then((res) => {
        setDoctors(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/admin/doctor/${id}`, headerToken)
          .then((res) => {
            window.location.reload()
          })
          .catch((err) => console.log(err))
  }
  return (
    <>
    <div className='flex'>
    <Sidebar userRole={userRole}/>
        <div className='w-full'>
          <h1 className='text-center text-2xl font-bold'>Manage Doctors</h1>
          <div className='mt-24'>
            <h2 className='ml-4'>List of Doctors</h2>
          <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Doctor ID</th>
                    <th className="border p-2">Doctor Name</th>
                    <th className="border p-2">Department</th>
                    <th className="border p-2">Specialization</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Clinic Address</th>
                    <th className="border p-2">Clinic Number</th>
                    <th className="border p-2">License Number</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td>No Doctors Data</td>
                  </tr>
                ) :(doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="border border-black">
                      DOC-{doctor._id}
                    </td>
                    <td className="border border-black">
                      {doctor.firstName} {doctor.lastName}
                    </td>
                    <td className="border border-black">
                      {doctor.dept_id.name}
                    </td>
                    <td className="border border-black">
                      {doctor.specialization}
                    </td>
                    <td className="border border-black">
                      {doctor.email}
                    </td>
                    <td className="border border-black">
                      
                    </td>
                    <td className="border border-black">
                      
                    </td>
                    <td className="border border-black">
                      {doctor.licenseNumber}
                    </td>
                    <td className="border border-black grid grid-cols-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(doctor._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))

                )}
                </tbody>
              </table>
          </div>
        </div>
    </div>
    </>
  )
}

export default ManageDoctor