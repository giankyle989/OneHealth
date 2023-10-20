import React, { useState, useEffect } from "react";
import axios from "axios";


const DocHistory = () => {
  const [appointments, setAppointments] = useState([])


    //Get token object
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
      .get("http://localhost:5000/api/doctor/appointment/get", headerToken)
      .then((res) => {
        // Sort the appointments by appointmentDateTime
        setAppointments(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen">
      <div>
        <div className="bg-white p-4">
          <div>
            <h1 className="text-center text-2xl font-bold">Appointment History</h1>
          </div>
          <div className="mt-4">
            <div className="mt-2 text-center overflow-x-auto">
            <input
            type="text"
            placeholder="Search by Patient Name"
            className="my-4 p-4 border rounded"
          />
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Time</th>
                    <th className="border p-2">Patient Name</th>
                    <th className="border p-2">Appointment ID</th>
                    <th className="border p-2">Diagnosis</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr>
                      <td>No data</td>
                    </tr>
                  ):(appointments.map((appointment) => (
                    <tr key={appointment._id}>
                    <td className="border text-center p-2">09-23-23</td>
                    <td className="border text-center p-2">10:30 AM</td>
                    <td className="border text-center p-2">{appointment.patientFirstName}{}</td>
                    <td className="border text-center p-2">{appointment._id}</td>
                    <td className="border text-center p-2">Headache</td>
                    <td className="border text-center p-2">Complete</td>
                    <td className="border text-center p-2">
                      <button
                        className="px-4 py-2 bg-[#4867D6] text-white rounded mr-2"
                        
                      >
                        View Patient
                      </button>
                    </td>
                  </tr>
                  )))}

                  {/* Add more appointment rows here */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocHistory;
